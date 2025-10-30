import { NextResponse } from "next/server";

const WISE_REFERRAL_URL = "https://wise.com/invite/dic/chetanb1";

export function GET() {
  return NextResponse.redirect(WISE_REFERRAL_URL, {
    status: 307,
  });
}
