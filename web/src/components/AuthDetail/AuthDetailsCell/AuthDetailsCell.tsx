import type { FindAuthDetails } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AuthDetails from 'src/components/AuthDetail/AuthDetails'

export const QUERY = gql`
  query FindAuthDetails {
    authDetails {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No authDetails yet. '}
      <Link to={routes.newAuthDetail()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ authDetails }: CellSuccessProps<FindAuthDetails>) => {
  return <AuthDetails authDetails={authDetails} />
}
