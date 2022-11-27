export const schema = gql`
  type Avatar {
    id: Int!
    address: String!
    image: String!
  }

  type Query {
    avatars: [Avatar!]! @requireAuth
    avatar(id: Int!): Avatar @requireAuth
  }

  input CreateAvatarInput {
    address: String!
    image: String!
  }

  input UpdateAvatarInput {
    address: String
    image: String
  }

  type Mutation {
    createAvatar(input: CreateAvatarInput!): Avatar! @requireAuth
    updateAvatar(id: Int!, input: UpdateAvatarInput!): Avatar! @requireAuth
    deleteAvatar(id: Int!): Avatar! @requireAuth
  }
`
