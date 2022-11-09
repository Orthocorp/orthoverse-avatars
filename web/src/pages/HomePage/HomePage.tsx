import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button, ButtonGroup } from '@chakra-ui/react'

const HomePage = () => {

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
  }, []);

  useEffect(() => {
    if (jimpImage) {
      const transformImage = async () => {        
        // performing the Jimp image processing operation 
        // on jimpImage...
        
        // e.g. jimpImage.crop(100, 100)
        // jimpImage.color([{apply:'saturate', params: [10]}])        


        // storing the transformed image
        // in Base64 format
        const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_PNG);
        setTransformedImage(transformedImage);
      };
      
      transformImage();
    }
  }, [jimpImage]);

  const saturate = async () => {
    if (jimpImage) {
      console.log("We have a jimp image")
      jimpImage.color([{apply:'saturate', params: [10]}])
      // storing the transformed image
      // in Base64 format
      const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_PNG);
      setTransformedImage(transformedImage);
    }
  }

  const desaturate = async () => {
    if (jimpImage) {
      jimpImage.color([{apply:'saturate', params: [-10]}])
      // storing the transformed image
      // in Base64 format
      const transformedImage = await jimpImage.getBase64Async(Jimp.MIME_PNG);
      setTransformedImage(transformedImage);
    }
  }

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />
      <Container>
        <h1>Orthoverse Avatars</h1>

        <ConnectKitButton />
        <AvatarDisplay
          skinUrl={ transformedImage }
        />
        <Button
          colorScheme='blue'
          onClick={ desaturate }
        >
          Desaturate
        </Button>&nbsp;
        <Button
          colorScheme='blue'
          onClick={ saturate }
        >
          Saturate
        </Button>
      </Container>
    </>
  )
}

export default HomePage
