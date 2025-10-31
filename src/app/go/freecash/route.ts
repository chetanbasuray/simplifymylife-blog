import { NextResponse } from "next/server";

const FREECASH_REFERRAL_URL = "https://freecash.com/r/PHGA1";

export function GET() {
  return NextResponse.redirect(FREECASH_REFERRAL_URL, {
    status: 307,
  });
}
