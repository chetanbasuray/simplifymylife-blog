import { NextResponse } from "next/server";

const RESPONDENT_REFERRAL_URL = "https://app.respondent.io/r/chetanbasuray-ed0c029f75eb";

export function GET() {
  return NextResponse.redirect(RESPONDENT_REFERRAL_URL, {
    status: 307,
  });
}
