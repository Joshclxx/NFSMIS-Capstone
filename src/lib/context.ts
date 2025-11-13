import { NextRequest } from "next/server";
import { GraphQLContext } from "@/types/DTO";

export async function createContext({req}: {req: NextRequest}): Promise<GraphQLContext>{
   return { req };
}