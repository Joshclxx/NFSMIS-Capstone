import { NextRequest, NextResponse } from "next/server";
import { getClientIp, hashClientDevice } from "@/utils/authUtils";
import { login } from "@/services/authServices";
import { LoginDTO } from "@/lib/schema/authSchema";
import { ERROR_RESPONSES, ErrorType } from "../../../../../../configs/apiResponses";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const { email, password }: LoginDTO = await req.json();
  const ip = getClientIp(req);
  const deviceHash = hashClientDevice(req);
  try {
    const user = await login({email, password, ip, deviceHash, contentType});
    return NextResponse.json({user})
  } catch (err) { 
    if (err instanceof Error && err.message in ERROR_RESPONSES) {
      const {status, code, message} = ERROR_RESPONSES[err.message as ErrorType];
      return NextResponse.json({code, message}, {status})
    }

    const { status, code, message } = ERROR_RESPONSES.internalServerError;
    return NextResponse.json({code, message}, {status});
  }
}
