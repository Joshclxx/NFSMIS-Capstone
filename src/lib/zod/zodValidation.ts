import { z } from "zod";
import { ERROR_RESPONSES } from "../../../configs/apiResponses";
import { NextResponse } from "next/server";

export async function validateBody<T>(request: Request, schema: z.ZodType<T>) {
  try {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return {
        data: null,
        errorResponse: NextResponse.json(
          {
            ...ERROR_RESPONSES.badRequest,
            details: result.error!.issues,
          },
          { status: ERROR_RESPONSES.badRequest.status }
        ),
      };
    }

    return { dataDefs: result.data, errorResponse: null };
  } catch (err) {
    console.log(err);
    return {
      data: null,
      errorResponse: NextResponse.json(ERROR_RESPONSES.badRequest, {
        status: 400,
      }),
    };
  }
}
