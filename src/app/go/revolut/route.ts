import { NextResponse } from "next/server";

const REVOLUT_REFERRAL_URL = "https://revolut.com/referral/?referral-code=chetanzyv";

export function GET() {
  return NextResponse.redirect(REVOLUT_REFERRAL_URL, {
    status: 307,
  });
}
