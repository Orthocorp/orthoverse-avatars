import type {
  QueryResolvers,
  MutationResolvers,
  AuthDetailRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const authDetails: QueryResolvers['authDetails'] = () => {
  return db.authDetail.findMany()
}

export const authDetail: QueryResolvers['authDetail'] = ({ id }) => {
  return db.authDetail.findUnique({
    where: { id },
  })
}

export const createAuthDetail: MutationResolvers['createAuthDetail'] = ({
  input,
}) => {
  return db.authDetail.create({
    data: input,
  })
}

export const updateAuthDetail: MutationResolvers['updateAuthDetail'] = ({
  id,
  input,
}) => {
  return db.authDetail.update({
    data: input,
    where: { id },
  })
}

export const deleteAuthDetail: MutationResolvers['deleteAuthDetail'] = ({
  id,
}) => {
  return db.authDetail.delete({
    where: { id },
  })
}

export const AuthDetail: AuthDetailRelationResolvers = {
  User: (_obj, { root }) => {
    return db.authDetail.findUnique({ where: { id: root?.id } }).User()
  },
}
