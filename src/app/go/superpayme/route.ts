import { NextResponse } from "next/server";

const SUPERPAYME_REFERRAL_URL = "https://superpay.me/?ref=1762109286";

export function GET() {
  return NextResponse.redirect(SUPERPAYME_REFERRAL_URL, {
    status: 307,
  });
}
