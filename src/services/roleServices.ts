import { getRoleNames } from "@/database/queries/roleQueries"

export const fetchRoles = async () => {
    const roles = await getRoleNames()
    return roles;
}