export const schema = gql`
  type User {
    id: Int!
    address: String!
    authDetail: AuthDetail!
    authDetailId: Int!
    image: String!
    design: String!
    name: String!
    level: Int!
    cape: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    address: String!
    authDetailId: Int!
    image: String!
    design: String!
    name: String!
    level: Int!
    cape: String!
  }

  input UpdateUserInput {
    address: String
    authDetailId: Int
    image: String
    design: String
    name: String
    level: Int
    cape: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
  }
`
