import { NextResponse } from "next/server";

const BUTTONDOWN_ENDPOINT = "https://api.buttondown.email/v1/subscribers";

export async function POST(request) {
  try {
    const apiKey = process.env.BUTTONDOWN_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Newsletter is not currently available. Please try again soon." },
        { status: 503 },
      );
    }

    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    const response = await fetch(BUTTONDOWN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: normalizedEmail,
        notes: "Simplify My Life Sunday Note subscriber",
        tags: ["simplify-my-life", "newsletter"],
      }),
    });

    if (response.status === 201) {
      return NextResponse.json({ message: "Thanks for joining! Your free Sunday Note is on the way." }, { status: 201 });
    }

    const payload = await response.json().catch(() => null);

    if (response.status === 400 && payload?.email?.[0]) {
      const detail = payload.email[0];
      if (/already/i.test(detail)) {
        return NextResponse.json({ message: "You’re already on the list. We’re glad you’re staying!" }, { status: 200 });
      }
    }

    if (!response.ok) {
      const detail =
        payload?.detail || payload?.message || "We couldn’t add that email right now. Please try again shortly.";
      return NextResponse.json({ error: detail }, { status: response.status || 500 });
    }

    return NextResponse.json({ message: "You’re in!" }, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unexpected error subscribing. Please try again later." },
      { status: 500 },
    );
  }
}
