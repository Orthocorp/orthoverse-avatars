import type { Prisma, Avatar } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.AvatarCreateArgs>({
  avatar: {
    one: { data: { address: 'String5630767', image: 'String' } },
    two: { data: { address: 'String6251138', image: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Avatar, 'avatar'>
