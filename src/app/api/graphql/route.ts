import {ApolloServer} from "@apollo/server"
import {startServerAndCreateNextHandler} from "@as-integrations/next"
import { NextRequest } from "next/server";
import { typeDefs } from "@/graphql/typeDefs/index.schema";
import { resolvers } from "@/graphql/resolvers/index.resolvers";
import { createContext } from "@/lib/context";
import { withCors } from "@/lib/withCors";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (err) => {
        return {
            message: err.message
        }
    }
});


const handler = startServerAndCreateNextHandler(server, {
  context: async ( req: NextRequest ) => createContext({ req }),
});

export const GET = async (req: NextRequest) => await withCors(req, handler)
export const POST = async (req: NextRequest) => await withCors(req, handler)
export const OPTIONS = () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "https://your-frontend.com",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        }
    })
}

//test branch