import type { Avatar } from '@prisma/client'

import {
  avatars,
  avatar,
  createAvatar,
  updateAvatar,
  deleteAvatar,
} from './avatars'
import type { StandardScenario } from './avatars.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('avatars', () => {
  scenario('returns all avatars', async (scenario: StandardScenario) => {
    const result = await avatars()

    expect(result.length).toEqual(Object.keys(scenario.avatar).length)
  })

  scenario('returns a single avatar', async (scenario: StandardScenario) => {
    const result = await avatar({ id: scenario.avatar.one.id })

    expect(result).toEqual(scenario.avatar.one)
  })

  scenario('creates a avatar', async () => {
    const result = await createAvatar({
      input: { address: 'String804190', image: 'String' },
    })

    expect(result.address).toEqual('String804190')
    expect(result.image).toEqual('String')
  })

  scenario('updates a avatar', async (scenario: StandardScenario) => {
    const original = (await avatar({ id: scenario.avatar.one.id })) as Avatar
    const result = await updateAvatar({
      id: original.id,
      input: { address: 'String52174402' },
    })

    expect(result.address).toEqual('String52174402')
  })

  scenario('deletes a avatar', async (scenario: StandardScenario) => {
    const original = (await deleteAvatar({
      id: scenario.avatar.one.id,
    })) as Avatar
    const result = await avatar({ id: original.id })

    expect(result).toEqual(null)
  })
})
