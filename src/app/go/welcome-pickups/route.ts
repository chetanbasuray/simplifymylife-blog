import { NextResponse } from "next/server";

const WELCOME_PICKUPS_URL = "https://tpo.lu/wkIdUnuV";

export function GET() {
  return NextResponse.redirect(WELCOME_PICKUPS_URL, {
    status: 307,
  });
}
