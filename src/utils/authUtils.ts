import { NextRequest } from "next/server";
import crypto from "crypto";

export function getClientIp(req: NextRequest): string | undefined {
  if (process.env.NODE_ENV === "development") {
    return "127.0.0.1";
  }

  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return Array.isArray(forwarded)
      ? (forwarded[0] as string)
      : forwarded?.split(",")[0].trim() || "127.0.0.1";
  }

  const vercelIp =
    req.headers.get("x-real-ip") ||
    req.headers.get("x-vercel-forwarded-for") ||
    "127.0.0.1";
  if (vercelIp) {
    return vercelIp;
  }
}

export function hashClientDevice(req: NextRequest) {
  const deviceFingerprint = {
    userAgent: req.headers.get("user-agent") || "",
    acceptLang: req.headers.get("accept-language") || "",
    accept: req.headers.get("accept") || "",
    acceptEncoding: req.headers.get("accept-encoding") || "",
    dnt: req.headers.get("dnt") || "",
    secChUa: req.headers.get("sec-ch-ua") || "",
    secChUaPlatform: req.headers.get("sec-ch-ua-platform") || "",
    secChUaMobile: req.headers.get("sec-ch-ua-mobile") || "",
  };

  const parsedDeviceInfo = JSON.stringify(deviceFingerprint);
  return crypto.createHash("sha256").update(parsedDeviceInfo).digest("hex");
}

export const isValidEmail = <T>(email: T): boolean => {
  if (typeof email !== "string") return false;
  return /^(?=.{6,30}@)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/.test(email);
};

export const isValidPassword = <T>(password: T): boolean => {
  if (typeof password !== "string") return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  return (
    password.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecialChar
  );
};
