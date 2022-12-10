import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/AuthDetail/AuthDetailsCell'
import { timeTag, truncate } from 'src/lib/formatters'

import type { DeleteAuthDetailMutationVariables, FindAuthDetails } from 'types/graphql'

const DELETE_AUTH_DETAIL_MUTATION = gql`
  mutation DeleteAuthDetailMutation($id: String!) {
    deleteAuthDetail(id: $id) {
      id
    }
  }
`

const AuthDetailsList = ({ authDetails }: FindAuthDetails) => {
  const [deleteAuthDetail] = useMutation(DELETE_AUTH_DETAIL_MUTATION, {
    onCompleted: () => {
      toast.success('AuthDetail deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteAuthDetailMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete authDetail ' + id + '?')) {
      deleteAuthDetail({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nonce</th>
            <th>Timestamp</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {authDetails.map((authDetail) => (
            <tr key={authDetail.id}>
              <td>{truncate(authDetail.id)}</td>
              <td>{truncate(authDetail.nonce)}</td>
              <td>{timeTag(authDetail.timestamp)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.authDetail({ id: authDetail.id })}
                    title={'Show authDetail ' + authDetail.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editAuthDetail({ id: authDetail.id })}
                    title={'Edit authDetail ' + authDetail.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete authDetail ' + authDetail.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(authDetail.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AuthDetailsList
