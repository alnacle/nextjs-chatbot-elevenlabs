import { ElevenLabsClient } from "elevenlabs";
import { NextRequest, NextResponse } from "next/server";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY
})

export async function POST(req: NextRequest) {

    const { voice, message } = await req.json()

    const response = await elevenlabs.generate({
        voice: voice,
        text: message,
        model_id: "eleven_multilingual_v2"
    });

    return new NextResponse(response);
}
