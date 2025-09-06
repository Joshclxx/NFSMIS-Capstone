import { NextRequest } from "next/server";
import { GraphQLContext } from "@/types/graphqlTypes";

export async function createContext({req}: {req: NextRequest}): Promise<GraphQLContext>{
   return { req };
}