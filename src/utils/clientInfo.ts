import { NextRequest } from "next/server";
import crypto from "crypto"

export function getClientIp(req: NextRequest) {
    if(process.env.NODE_ENV === "development") {
        return "127.0.0.1"
    }

    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        return Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0].trim();
    }
    
    const vercelIp = req.headers.get("x-real-ip") || req.headers.get("x-vercel-forwarded-for");
    if (vercelIp) {
        return vercelIp;
    }
}

export function getClientFingerprint (req: NextRequest) {
    const deviceFingerprint = {
        userAgent: req.headers.get("user-agent") || "",
        acceptLang: req.headers.get("accept-language") || "",
        accept: req.headers.get("accept") || "",
        acceptEncoding: req.headers.get("accept-encoding") || "",
        dnt: req.headers.get("dnt") || "",
        secChUa: req.headers.get("sec-ch-ua") || "",
        secChUaPlatform: req.headers.get("sec-ch-ua-platform") || "",
        secChUaMobile: req.headers.get("sec-ch-ua-mobile") || "",
    }

    const parsedDeviceInfo = JSON.stringify(deviceFingerprint);
    return crypto.createHash("sha256").update(parsedDeviceInfo).digest("hex")
}


