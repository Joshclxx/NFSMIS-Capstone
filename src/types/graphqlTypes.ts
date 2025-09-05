import { NextRequest } from "next/server"

export type GraphQLContext = {
    req: NextRequest
}