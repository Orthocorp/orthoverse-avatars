import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {

/*
  const [jimpImage, setJimpImage] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [transformedImage, setTransformedImage] = useState(undefined);

  useEffect(() => {
    const loadImage = async () => {
      // generating the Jimp data structure
      // loading an image from an URL
      const jimpImage = await Jimp.read("./img/gandalf.png");
      setJimpImage(jimpImage);
      
      // transforming jimpImage into its Base64 representation
      // and storing it
      const image = await jimpImage.getBase64Async(Jimp.MIME_PNG);
      setImage(image);
    };
    
    loadImage();
  }, []); */

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />
      <Container>
        <h1>Orthoverse Avatars</h1>

        <ConnectKitButton />
        <AvatarDisplay
          skinUrl="data:image/png;base64,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"
        />
      </Container>
    </>
  )
}

export default HomePage
