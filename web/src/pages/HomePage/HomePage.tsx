import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />
      <Container>
        <h1>Orthoverse Avatars</h1>

        <ConnectKitButton />
      </Container>
    </>
  )
}

export default HomePage
