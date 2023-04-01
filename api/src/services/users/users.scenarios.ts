import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        address: 'String4145794',
        name: 'String6876526',
        authDetail: { create: { nonce: 'String' } },
      },
    },
    two: {
      data: {
        address: 'String8785',
        name: 'String1399953',
        authDetail: { create: { nonce: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
