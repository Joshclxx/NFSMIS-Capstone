import { NextRequest, NextResponse } from "next/server";
import { fetchAccounts } from "@/services/accountServices";
import {
  ERROR_RESPONSES,
  ErrorType,
} from "../../../../../configs/apiResponses";
import { validateBody } from "@/utils/zodUtils";
import { createAccountSchema } from "@/lib/zod/schema/accountSchema";
import { createAccount } from "@/services/accountServices";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  try {
    const accounts = await fetchAccounts(limit, offset);
    return NextResponse.json({ accounts });
  } catch (err) {
    console.log(err);
    if (err instanceof Error && err.message in ERROR_RESPONSES) {
      const { status, code, message } =
        ERROR_RESPONSES[err.message as ErrorType];
      return NextResponse.json({ code, message }, { status });
    }

    const { status, code, message } = ERROR_RESPONSES.internalServerError;
    return NextResponse.json({ code, message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { dataDefs, errorResponse } = await validateBody(
      req,
      createAccountSchema
    );
    if (errorResponse) return errorResponse;

    const result = await createAccount(dataDefs);
    return NextResponse.json({ dataDefs });
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
