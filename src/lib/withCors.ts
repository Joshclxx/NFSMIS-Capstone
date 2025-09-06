import { NextRequest } from "next/server";


export async function withCors(req: NextRequest, handlerFn: (req: NextRequest) => Promise<Response>) {
    const res = await handlerFn(req);

    res.headers.set("Access-Control-Allow-Origin", "https://your-frontend.com")
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    res.headers.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")

    return res
};