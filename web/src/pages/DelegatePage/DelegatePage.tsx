import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DelegatePage = () => {
  return (
    <>
      <MetaTags title="Delegate" description="Delegate page" />

      <h1>Delegates List</h1>
      <p>
        Look out for a future feature here - you can delegate building to other players (up to seven).
        By adding delegates to your land, they can enter it and dig/place blocks too. It is going to be a
        great tool to allow friends, family, or skilled voxel builders to enhance your land on your behalf.
      </p>
    </>
  )
}

export default DelegatePage
