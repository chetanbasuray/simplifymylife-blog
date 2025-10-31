import { NextResponse } from "next/server";

const GLG_REFERRAL_URL = "https://membership.glgresearch.com/onboarding?referralToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWZlcnJlZEJ5UGVyc29uSWQiOjEwMzQ5NTUwLCJjYW1wYWlnbiI6InJlZmVycmFsIiwiaWF0IjoxNzYxOTIzNzMwfQ.58WKBARQmU7_MpkewEMxlcWtvVSh3W_RBOTPA34B6hU";

export function GET() {
  return NextResponse.redirect(GLG_REFERRAL_URL, {
    status: 307,
  });
}
