import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "유효하지 않은 이메일입니다." }, { status: 400 })
  }

  // TODO: Supabase 연동 시 아래 주석 해제 후 env 변수 설정
  // import { createClient } from "@supabase/supabase-js"
  // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
  // const { error } = await supabase
  //   .from("waitlist")
  //   .insert({ email, created_at: new Date().toISOString() })
  // if (error) {
  //   if (error.code === "23505") {
  //     return NextResponse.json({ error: "이미 신청하신 이메일이에요." }, { status: 409 })
  //   }
  //   return NextResponse.json({ error: "오류가 발생했어요. 다시 시도해주세요." }, { status: 500 })
  // }

  console.log(`[waitlist] New signup: ${email}`)
  return NextResponse.json({ success: true })
}
