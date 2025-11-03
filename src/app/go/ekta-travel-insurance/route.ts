import { NextResponse } from "next/server";

const EKTA_TRAVEL_INSURANCE_URL = "https://ektatraveling.tpo.lu/ccFWi8Ri";

export function GET() {
  return NextResponse.redirect(EKTA_TRAVEL_INSURANCE_URL, {
    status: 307,
  });
}
