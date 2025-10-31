import { NextResponse } from "next/server";

const EARNSTAR_REFERRAL_URL = "https://earnstar.com/register?ref=9fcc8bb4-e810-4919-9439-a316e4fd3691";

export function GET() {
  return NextResponse.redirect(EARNSTAR_REFERRAL_URL, {
    status: 307,
  });
}
