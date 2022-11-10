import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import SkinTonePicker from 'src/components/SkinTonePicker'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button, ButtonGroup } from '@chakra-ui/react'

const HomePage = () => {

  const [jimpImage, setJimpImage] = useState(undefined);
  const [image, setImage] = useState(undefined);
  const [transformedImage, setTransformedImage] = useState(undefined);
  const [skintone, setSkintone] = useState();

  // kf106: from what I understand we use jimpImage on first load to get our
  // base image, and then use image as our trigger to handle updates, with
  // transformedImage returning the results, but I don't fully understand why
  // we need three image related state objects(and I can't get it to work with two)
  useEffect(() => {
    const loadImage = async () => {
      // generating the Jimp data structure
      // loading an image from an URL
      const jimpImage = await Jimp.read("./img/base.png");
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
        // Here we are going to overlay all the components to produce the final transformedImage
        
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

  // skintone select
  useEffect(() => {
    if (skintone) {
      const skinToneChange = async () => {        
        jimpImage.color([{apply:'mix', params: [skintone.hex, 75]}])        
        const transformedImage = await jimpImage.clone().getBase64Async(Jimp.MIME_PNG);
        setTransformedImage(transformedImage);
      };
      
      skinToneChange();
    }
  }, [skintone]);

  const desaturate = async () => {
    if (jimpImage) {
      jimpImage.color([{apply:'saturate', params: [10]}])
      // storing the transformed image
      // in Base64 format
      const transformedImage = await jimpImage.clone().getBase64Async(Jimp.MIME_PNG);
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
          Test
        </Button>

        <SkinTonePicker
          hexColor="#ff0000"
          colors={[
            "#291709", "#271910", "#392416", "#5F3310", "#733F17",
            "#6A4225", "#7F4422", "#8B5831", "#935F37", "#BB6436",
            "#B26644", "#AD8A60", "#CF965F", "#D49E7A", "#F2C280",
            "#ECC091", "#F8D998", "#F9D4A0", "#FDE7AD", "#FEE3C6", "#F3EEEA"
          ]}
          setSkintone={setSkintone}
        />
      </Container>
    </>
  )
}

export default HomePage
