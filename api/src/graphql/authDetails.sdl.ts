export const schema = gql`
  type AuthDetail {
    id: Int!
    nonce: String!
    timestamp: DateTime!
    User: [User]!
  }

  type Query {
    authDetails: [AuthDetail!]! @requireAuth
    authDetail(id: Int!): AuthDetail @requireAuth
  }

  input CreateAuthDetailInput {
    nonce: String!
    timestamp: DateTime!
  }

  input UpdateAuthDetailInput {
    nonce: String
    timestamp: DateTime
  }

  type Mutation {
    createAuthDetail(input: CreateAuthDetailInput!): AuthDetail! @requireAuth
    updateAuthDetail(id: Int!, input: UpdateAuthDetailInput!): AuthDetail!
      @requireAuth
    deleteAuthDetail(id: Int!): AuthDetail! @requireAuth
  }
`
