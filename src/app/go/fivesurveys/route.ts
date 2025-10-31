import { NextResponse } from "next/server";

const FIVESURVEYS_REFERRAL_URL = "https://fivesurveys.com/register?ref=9ffa1d3e-a4f9-40b8-abb8-a07e05e9c590";

export function GET() {
  return NextResponse.redirect(FIVESURVEYS_REFERRAL_URL, {
    status: 307,
  });
}
