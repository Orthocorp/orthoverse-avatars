export const schema = gql`
  type AuthDetail {
    id: String!
    nonce: String!
    timestamp: DateTime!
    User: [User]!
  }

  type Query {
    authDetails: [AuthDetail!]! @requireAuth
    authDetail(id: String!): AuthDetail @requireAuth
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
    updateAuthDetail(id: String!, input: UpdateAuthDetailInput!): AuthDetail!
      @requireAuth
    deleteAuthDetail(id: String!): AuthDetail! @requireAuth
  }
`
