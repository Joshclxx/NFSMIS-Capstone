import {PrismaClient} from "@prisma/client"


const globalThisPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalThisPrisma.prisma?? new PrismaClient({
    log: ["query", "error", "warn"]
})

