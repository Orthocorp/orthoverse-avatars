export const schema = gql`
  type User {
    id: Int!
    address: String!
    authDetail: AuthDetail!
    authDetailId: Int!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    address: String!
    authDetailId: Int!
  }

  input UpdateUserInput {
    address: String
    authDetailId: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
