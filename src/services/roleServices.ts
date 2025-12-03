import { getRoleData } from "@/database/queries/roleQueries"

export const fetchRoles = async () => {
    const roles = await getRoleData()
    return roles;
}