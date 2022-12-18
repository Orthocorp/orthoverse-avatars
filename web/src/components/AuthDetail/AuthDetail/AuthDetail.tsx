import type {
  DeleteAuthDetailMutationVariables,
  FindAuthDetailById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_AUTH_DETAIL_MUTATION = gql`
  mutation DeleteAuthDetailMutation($id: String!) {
    deleteAuthDetail(id: $id) {
      id
    }
  }
`

interface Props {
  authDetail: NonNullable<FindAuthDetailById['authDetail']>
}

const AuthDetail = ({ authDetail }: Props) => {
  const [deleteAuthDetail] = useMutation(DELETE_AUTH_DETAIL_MUTATION, {
    onCompleted: () => {
      toast.success('AuthDetail deleted')
      navigate(routes.authDetails())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteAuthDetailMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete authDetail ' + id + '?')) {
      deleteAuthDetail({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            AuthDetail {authDetail.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{authDetail.id}</td>
            </tr>
            <tr>
              <th>Nonce</th>
              <td>{authDetail.nonce}</td>
            </tr>
            <tr>
              <th>Timestamp</th>
              <td>{timeTag(authDetail.timestamp)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editAuthDetail({ id: authDetail.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(authDetail.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default AuthDetail
