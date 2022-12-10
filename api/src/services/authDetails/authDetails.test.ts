import type { AuthDetail } from '@prisma/client'

import {
  authDetails,
  authDetail,
  createAuthDetail,
  updateAuthDetail,
  deleteAuthDetail,
} from './authDetails'
import type { StandardScenario } from './authDetails.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('authDetails', () => {
  scenario('returns all authDetails', async (scenario: StandardScenario) => {
    const result = await authDetails()

    expect(result.length).toEqual(Object.keys(scenario.authDetail).length)
  })

  scenario(
    'returns a single authDetail',
    async (scenario: StandardScenario) => {
      const result = await authDetail({ id: scenario.authDetail.one.id })

      expect(result).toEqual(scenario.authDetail.one)
    }
  )

  scenario('creates a authDetail', async () => {
    const result = await createAuthDetail({
      input: { nonce: 'String' },
    })

    expect(result.nonce).toEqual('String')
  })

  scenario('updates a authDetail', async (scenario: StandardScenario) => {
    const original = (await authDetail({
      id: scenario.authDetail.one.id,
    })) as AuthDetail
    const result = await updateAuthDetail({
      id: original.id,
      input: { nonce: 'String2' },
    })

    expect(result.nonce).toEqual('String2')
  })

  scenario('deletes a authDetail', async (scenario: StandardScenario) => {
    const original = (await deleteAuthDetail({
      id: scenario.authDetail.one.id,
    })) as AuthDetail
    const result = await authDetail({ id: original.id })

    expect(result).toEqual(null)
  })
})
