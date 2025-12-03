import { NextRequest, NextResponse } from "next/server";
import { fetchRoles } from "@/services/roleServices";
import { ErrorType, ERROR_RESPONSES } from "../../../../../configs/apiResponses";

export async function GET(req: NextRequest) {
    try {
        const roles = await fetchRoles();
        return NextResponse.json({roles})
    } catch (err) {
        if (err instanceof Error && err.message in ERROR_RESPONSES) {
            const {status, code, message} = ERROR_RESPONSES[err.message as ErrorType];
            return NextResponse.json({code, message}, {status})
        }

        const {status, code, message} = ERROR_RESPONSES.internalServerError
        return NextResponse.json({code, message}, {status})
    }
}