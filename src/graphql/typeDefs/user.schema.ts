import {gql} from "graphql-tag"

export const userSchema = gql`
  type User {
    name: String
  }

  extend type Query {
    hello: String
  }

  extend type Mutation {
    hello: String
  }
`