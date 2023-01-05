import type { CreateAuthDetailInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AuthDetailForm from 'src/components/AuthDetail/AuthDetailForm'

const CREATE_AUTH_DETAIL_MUTATION = gql`
  mutation CreateAuthDetailMutation($input: CreateAuthDetailInput!) {
    createAuthDetail(input: $input) {
      id
    }
  }
`

const NewAuthDetail = () => {
  const [createAuthDetail, { loading, error }] = useMutation(
    CREATE_AUTH_DETAIL_MUTATION,
    {
      onCompleted: () => {
        toast.success('AuthDetail created')
        navigate(routes.authDetails())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateAuthDetailInput) => {
    createAuthDetail({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New AuthDetail</h2>
      </header>
      <div className="rw-segment-main">
        <AuthDetailForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAuthDetail
