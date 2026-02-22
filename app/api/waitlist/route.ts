import { NextRequest, NextResponse } from "next/server"
import { google } from "googleapis"

const SHEET_NAME = "Sheet1"

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

async function getCount(): Promise<number> {
  const sheets = await getSheets()
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:A`,
  })
  const rows = res.data.values ?? []
  // 첫 행은 헤더(Email)이므로 제외
  return Math.max(0, rows.length - 1)
}

async function appendEmail(email: string): Promise<number> {
  const sheets = await getSheets()
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:B`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[email, new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })]],
    },
  })
  return await getCount()
}

export async function GET() {
  try {
    const count = await getCount()
    return NextResponse.json({ count })
  } catch (err) {
    console.error("[waitlist GET]", err)
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "유효하지 않은 이메일입니다." }, { status: 400 })
  }

  try {
    const count = await appendEmail(email.trim().toLowerCase())
    return NextResponse.json({ success: true, count })
  } catch (err) {
    console.error("[waitlist POST]", err)
    return NextResponse.json({ error: "오류가 발생했어요. 다시 시도해주세요." }, { status: 500 })
  }
}
