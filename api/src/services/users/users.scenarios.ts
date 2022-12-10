import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        address: 'String4902112',
        authDetail: { create: { nonce: 'String' } },
      },
    },
    two: {
      data: {
        address: 'String2792580',
        authDetail: { create: { nonce: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
