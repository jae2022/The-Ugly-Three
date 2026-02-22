import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
  return google.sheets({ version: "v4", auth })
}

// 첫 번째 시트 이름을 동적으로 가져옴 (Sheet1/시트1 등 이름 무관)
async function getFirstSheetName(): Promise<string> {
  const sheets = await getSheets()
  const meta = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
  })
  return meta.data.sheets?.[0]?.properties?.title ?? "Sheet1"
}

async function getCount(): Promise<number> {
  const sheets = await getSheets()
  const sheetName = await getFirstSheetName()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetName}!A:A`,
  })
  const rows = res.data.values ?? []
  // 첫 행은 헤더(Email)이므로 제외
  return Math.max(0, rows.length - 1)
}

async function appendEmail(email: string): Promise<number> {
  const sheets = await getSheets()
  const sheetName = await getFirstSheetName()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${sheetName}!A:B`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })]],
    },
  })
  return await getCount()
}

function checkEnvVars() {
  const missing: string[] = []
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL")
  if (!process.env.GOOGLE_PRIVATE_KEY) missing.push("GOOGLE_PRIVATE_KEY")
  if (!process.env.GOOGLE_SHEET_ID) missing.push("GOOGLE_SHEET_ID")
  return missing
}

export async function GET() {
  const missing = checkEnvVars()
  if (missing.length > 0) {
    console.error("[waitlist GET] Missing env vars:", missing)
    return NextResponse.json({ count: 0 })
  }

  try {
    const count = await getCount()
    return NextResponse.json({ count })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[waitlist GET] Sheets error:", msg)
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(req: NextRequest) {
  const missing = checkEnvVars()
  if (missing.length > 0) {
    console.error("[waitlist POST] Missing env vars:", missing)
    return NextResponse.json(
      { error: `서버 설정 오류: 환경변수 누락 (${missing.join(", ")})` },
      { status: 500 }
    )
  }

  const { email } = await req.json()

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "유효하지 않은 이메일입니다." }, { status: 400 })
  }

  try {
    const count = await appendEmail(email.trim().toLowerCase())
    return NextResponse.json({ success: true, count })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error("[waitlist POST] Sheets error:", msg)
    return NextResponse.json(
      { error: `Google Sheets 오류: ${msg}` },
      { status: 500 }
    )
  }
}
