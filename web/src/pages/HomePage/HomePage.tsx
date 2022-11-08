import { ConnectKitButton } from 'connectkit'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'


const HomePage = () => {
  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />

      <h1>Orthoverse Avatars</h1>

      <ConnectKitButton />
    </>
  )
}

export default HomePage
