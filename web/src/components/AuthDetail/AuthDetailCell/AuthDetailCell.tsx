import type { FindAuthDetailById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import AuthDetail from 'src/components/AuthDetail/AuthDetail'

export const QUERY = gql`
  query FindAuthDetailById($id: Int!) {
    authDetail: authDetail(id: $id) {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>AuthDetail not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  authDetail,
}: CellSuccessProps<FindAuthDetailById>) => {
  return <AuthDetail authDetail={authDetail} />
}
