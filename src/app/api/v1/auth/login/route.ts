import { NextRequest, NextResponse } from "next/server";
import { login } from "@/services/authServices";
import {
  ERROR_RESPONSES,
  ErrorType,
} from "../../../../../../configs/apiResponses";

export async function POST(req: NextRequest) {
  try {
    const user = await login(req);
    return NextResponse.json({ user });
  } catch (err) {
    if (err instanceof Error && err.message in ERROR_RESPONSES) {
      const { status, code, message } =
        ERROR_RESPONSES[err.message as ErrorType];

      return NextResponse.json({ code, message }, { status });
    }

    const { status, code, message } = ERROR_RESPONSES.internalServerError;
    return NextResponse.json({ code, message }, { status });
  }
}
