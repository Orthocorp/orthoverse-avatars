import type { EditAuthDetailById, UpdateAuthDetailInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AuthDetailForm from 'src/components/AuthDetail/AuthDetailForm'

export const QUERY = gql`
  query EditAuthDetailById($id: String!) {
    authDetail: authDetail(id: $id) {
      id
      nonce
      timestamp
    }
  }
`
const UPDATE_AUTH_DETAIL_MUTATION = gql`
  mutation UpdateAuthDetailMutation($id: String!, $input: UpdateAuthDetailInput!) {
    updateAuthDetail(id: $id, input: $input) {
      id
      nonce
      timestamp
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ authDetail }: CellSuccessProps<EditAuthDetailById>) => {
  const [updateAuthDetail, { loading, error }] = useMutation(
    UPDATE_AUTH_DETAIL_MUTATION,
    {
      onCompleted: () => {
        toast.success('AuthDetail updated')
        navigate(routes.authDetails())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateAuthDetailInput,
    id: EditAuthDetailById['authDetail']['id']
  ) => {
    updateAuthDetail({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit AuthDetail {authDetail?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <AuthDetailForm authDetail={authDetail} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
