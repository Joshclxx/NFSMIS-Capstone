import { NextRequest } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { env } from "../../configs/env";

export function getClientIp(request: NextRequest): string {
  const xRealIp = request.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp;
  }

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  return "127.0.0.1";
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

// export const isValidEmail = <T>(email: T): boolean => {
//   if (typeof email !== "string") return false;
//   return /^(?=.{6,30}@)[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@gmail\.com$/.test(email);
// };

// export const isValidPassword = <T>(password: T): boolean => {
//   if (typeof password !== "string") return false;
//   const hasUpper = /[A-Z]/.test(password);
//   const hasLower = /[a-z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);
//   const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
//   return (
//     password.length >= 8 && hasLower && hasUpper && hasNumber && hasSpecialChar
//   );
// };


//sessions utils
export const createSessionCookie = async (userId: string) => {
  const token = crypto.randomBytes(64).toString('hex');
  const userSessionKey = `user:${userId}:sessions`;
  return token
}

export const setSessionCookie = async (token: string) => {
  (await cookies()).set('session', token, {
    httpOnly: true,
    secure: env.isProd,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7 //7days
  })
}

export const getSessionCookie = async () => {
  return (await cookies()).get(env.sessionCookieName)?.value
}

export const clearSessionCookie = async () => {
  (await cookies()).set(env.sessionCookieName, "", {
    httpOnly: false,
    secure: env.isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}