import { NextResponse } from "next/server";

const N26_REFERRAL_URL = "https://n26.com/r/chetanb7580";

export function GET() {
  return NextResponse.redirect(N26_REFERRAL_URL, {
    status: 307,
  });
}
