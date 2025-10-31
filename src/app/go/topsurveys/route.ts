import { NextResponse } from "next/server";

const TOPSURVEYS_REFERRAL_URL = "https://topsurveys.app/register?ref=9e4829ee-d623-4a9a-8474-786a41b83c77";

export function GET() {
  return NextResponse.redirect(TOPSURVEYS_REFERRAL_URL, {
    status: 307,
  });
}
