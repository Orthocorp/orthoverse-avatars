import type { Prisma, AuthDetail } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AuthDetailCreateArgs>({
  authDetail: {
    one: { data: { nonce: 'String' } },
    two: { data: { nonce: 'String' } },
  },
})

export type StandardScenario = ScenarioData<AuthDetail, 'authDetail'>
