import { userSchema } from "./user.schema";
import {gql} from "graphql-tag"

export const typeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  ${userSchema}
`