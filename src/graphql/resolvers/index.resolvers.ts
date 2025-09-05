import { userMutation } from "./mutation/user.mutation";
import { userQuery } from "./query/user.query";

export const resolvers = {
    Query: {
        ...userQuery.Query,
    },
    Mutation: {
        ...userMutation.Mutation
    }
}