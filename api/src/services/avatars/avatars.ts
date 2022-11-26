import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const avatars: QueryResolvers['avatars'] = () => {
  return db.avatar.findMany()
}

export const avatar: QueryResolvers['avatar'] = ({ id }) => {
  return db.avatar.findUnique({
    where: { id },
  })
}

export const createAvatar: MutationResolvers['createAvatar'] = ({ input }) => {
  return db.avatar.create({
    data: input,
  })
}

export const updateAvatar: MutationResolvers['updateAvatar'] = ({
  id,
  input,
}) => {
  return db.avatar.update({
    data: input,
    where: { id },
  })
}

export const deleteAvatar: MutationResolvers['deleteAvatar'] = ({ id }) => {
  return db.avatar.delete({
    where: { id },
  })
}
