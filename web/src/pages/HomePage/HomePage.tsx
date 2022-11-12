import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import TonePicker from 'src/components/SkinTonePicker'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'

import { initBase64 } from './base'

const HomePage = () => {

  const skinTonePalette = [
    "#291709", "#271910", "#392416", "#5F3310", "#733F17",
    "#6A4225", "#7F4422", "#8B5831", "#935F37", "#BB6436",
    "#B26644", "#AD8A60", "#CF965F", "#D49E7A", "#F2C280",
    "#ECC091", "#F8D998", "#F9D4A0", "#FDE7AD", "#FEE3C6", "#F3EEEA"
  ]

  const eyeColorPalette = [
    "#DEC27C", "#CFF087", "#64C5CE", "#A1AD79", "#9ADA76",
    "#69A6DD", "#79BC5E", "#7F92D6", "#8B8959", "#7288DB",
    "#9C713E", "#614023", "#83240F", "#4D311F", "#403321",
    "#392C2C", "#53212F", "#2B246D", "#30221B", "#22201A", "#1F0E46"
  ]

  const [animation, setAnimation] = useState('none');

  const [jimpImage, setJimpImage] = useState(undefined);
  const [transformedImage, setTransformedImage] = useState(initBase64);
  const [features, setFeatures] = useState(undefined)
  const [scleraImg, setScleraImg] = useState(undefined)
  const [irisImg, setIrisImg] = useState(undefined)

  const [skintone, setSkintone] = useState({
    "hex": skinTonePalette[Math.floor(Math.random()*skinTonePalette.length)]
  });
  const [eyecolor, setEyecolor] = useState({
    "hex": eyeColorPalette[Math.floor(Math.random()*skinTonePalette.length)]
  });
  const [eyes, setEyes] = useState('small')

  useEffect(() => {
    const loadImage = async () => {

      // loading underlying skin
      const jimpImage = await Jimp.read("./img/base.png");
      const features = await Jimp.read("./img/features.png")
      setJimpImage(jimpImage)
      setFeatures(features)

      // set base for eyes
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      setScleraImg(scleraImg)
      setIrisImg(irisImg)

      const ovrA = await jimpImage.clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}]).composite(features
        .clone().color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrC.getBase64Async(Jimp.MIME_PNG);
      setTransformedImage(transformedImage);
    };
    
    loadImage()
  }, []);

  // skintone select
  const skinToneChange = async () => { 
    if (jimpImage && eyecolor) {         
      // set overlays
      const ovrA = await jimpImage
        .clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg
        .clone()
        .color([{apply:'mix', params: [eyecolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrC.getBase64Async(Jimp.MIME_PNG);      
      setTransformedImage(transformedImage);
    }
  };

  useEffect(() => {
    if (jimpImage && skintone) {
      skinToneChange();
    }
  }, [skintone]);

  // eye color select
  const eyeColorChange = async () => { 
    if (jimpImage && skintone) {         
      // set overlays
      const ovrA = await jimpImage
        .clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg
        .clone()
        .color([{apply:'mix', params: [eyecolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrC.getBase64Async(Jimp.MIME_PNG);      
      setTransformedImage(transformedImage);
    }
  };

  useEffect(() => {
    if (jimpImage && eyecolor) {
      eyeColorChange();
    }
  }, [eyecolor]);

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />
      <Container>
        <h1>Orthoverse Avatars</h1>

        <ConnectKitButton />

        <h2>Animation</h2>
        <RadioGroup onChange={ setAnimation } value={ animation }>
          <Stack direction='row'>
            <Radio value='none'>None</Radio>
            <Radio value='idle'>Idle</Radio>
            <Radio value='walk'>Walk</Radio>
            <Radio value='run'>Run</Radio>
            <Radio value='fly'>Fly</Radio>
          </Stack>
        </RadioGroup>

        <AvatarDisplay
          className="viewer"
          skinUrl={ transformedImage }
          animation={ animation }
        />

        <h2>Skin Tone</h2>
        <TonePicker
          hexColor="#ff0000"
          colors={skinTonePalette}
          setColor={setSkintone}
        />
        <h2>Eye Color</h2>
        <TonePicker
          hexColor="#ff0000"
          colors={eyeColorPalette}
          setColor={setEyecolor}
        />

      </Container>
    </>
  )
}

export default HomePage
