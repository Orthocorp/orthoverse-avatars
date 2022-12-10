import AuthDetailCell from 'src/components/AuthDetail/AuthDetailCell'

type AuthDetailPageProps = {
  id: string
}

const AuthDetailPage = ({ id }: AuthDetailPageProps) => {
  return <AuthDetailCell id={id} />
}

export default AuthDetailPage
