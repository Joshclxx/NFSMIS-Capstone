import { NextRequest, NextResponse } from "next/server";
import { getClientIp, hashClientDevice } from "@/utils/authUtils";
import { login } from "@/services/authServices";

export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") || "";
  const {email, password} = await req.json();
  const ip = getClientIp(req);
  const deviceHash = hashClientDevice(req);
  try {
    const user = await login(email, password, ip, deviceHash, contentType);

    return NextResponse.json({user})
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "Server Internal Error" }, { status: 500 });
  }
}


