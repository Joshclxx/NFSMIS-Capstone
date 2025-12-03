

export const env = {
    node: process.env.NODE_ENV ?? "development",
    isProd: process.env.NODE_ENV === "production",
    dbStr: process.env.DATABASE_URL ?? "",
    sessionCookieName: process.env.SESSION_COOKIE_NAME ?? "session"
} as const