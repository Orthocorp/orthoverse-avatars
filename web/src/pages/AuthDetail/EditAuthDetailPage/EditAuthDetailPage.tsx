import EditAuthDetailCell from 'src/components/AuthDetail/EditAuthDetailCell'

type AuthDetailPageProps = {
  id: string
}

const EditAuthDetailPage = ({ id }: AuthDetailPageProps) => {
  return <EditAuthDetailCell id={id} />
}

export default EditAuthDetailPage
