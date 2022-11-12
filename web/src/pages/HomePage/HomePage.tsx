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
import { Checkbox } from '@chakra-ui/react'

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

  const beardColorPalette = [
    "#030303", "#343434", "#686a69", "#b1b5b8", "#dde3e7",
    "#bc3b15", "#ba6025", "#fe5f35", "#fbcf2b", "#fef87e",
    "#1c0a19", "#92593b", "#553118", "#c98359", "#dfbdb2",
    "#bd3d46", "#eb9fb3", "#579ec8", "#008c48", "#e14674", "#421479"
  ]

  const [animation, setAnimation] = useState('none')

  const [jimpImage, setJimpImage] = useState(undefined)
  const [transformedImage, setTransformedImage] = useState(initBase64)
  const [features, setFeatures] = useState(undefined)
  const [scleraImg, setScleraImg] = useState(undefined)
  const [irisImg, setIrisImg] = useState(undefined)
  const [beardImg, setBeardImg] = useState(undefined)

  const [skintone, setSkintone] = useState({
    "hex": skinTonePalette[Math.floor(Math.random()*skinTonePalette.length)]
  })
  const [eyecolor, setEyecolor] = useState({
    "hex": eyeColorPalette[Math.floor(Math.random()*eyeColorPalette.length)]
  })
  const [beardcolor, setBeardcolor] = useState({
    "hex": beardColorPalette[Math.floor(Math.random()*beardColorPalette.length)]
  })

  const [eyes, setEyes] = useState('small')
  const [beard, setBeard] = useState('0')

  useEffect(() => {
    const loadImage = async () => {

      // loading underlying skin
      const jimpImage = await Jimp.read("./img/base.png")
      const features = await Jimp.read("./img/features.png")
      setJimpImage(jimpImage)
      setFeatures(features)

      // set base for eyes
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      setScleraImg(scleraImg)
      setIrisImg(irisImg)

      // set base for beard
      console.log("./img/beards/beard-" + beard.toString() + ".png")
      const beardImg = await Jimp.read("./img/beards/beard-" + beard.toString() + ".png")
      setBeardImg(beardImg)

      const ovrA = await jimpImage.clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}]).composite(features
        .clone().color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrD = await ovrC.composite(beardImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrD.getBase64Async(Jimp.MIME_PNG)
      setTransformedImage(transformedImage)
    }
    
    loadImage()
  }, [])

  const applyChanges = async () => { 
    if (jimpImage) {         
      // set overlays
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      setScleraImg(scleraImg)
      setIrisImg(irisImg)
      const beardImg = await Jimp.read("./img/beards/beard-" + beard + ".png")
      setBeardImg(beardImg)

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
      const ovrD = await ovrC.composite(beardImg
        .clone()
        .color([{apply:'mix', params: [beardcolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrD.getBase64Async(Jimp.MIME_PNG)    
      setTransformedImage(transformedImage)
    }
  }

  useEffect(() => {
    if (jimpImage) {
      applyChanges()
    }
  }, [skintone, eyecolor, eyes, beard, beardcolor])

  // eye size set
  const setEyeSize = (value) => {
    if (value == true) {
      setEyes('large')
    } else {
      setEyes('small')
    }
    console.log("Set eyes to " + eyes)
  }

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

        <Checkbox
         isChecked={(eyes === 'small' ? false : true)}
         onChange={(e) => setEyeSize(e.target.checked)}
        >
          Large Eyes
        </Checkbox>

         <h2>Beard Color</h2>
        <TonePicker
          hexColor="#ff0000"
          colors={beardColorPalette}
          setColor={setBeardcolor}
        />
        <RadioGroup onChange={ setBeard } value={ beard }>
          <Stack direction='row'>
            <Radio value='0'>None</Radio>
            <Radio value='1'>Moustache</Radio>
            <Radio value='2'>Handlebar</Radio>
            <Radio value='3'>Short</Radio>
            <Radio value='4'>Medium</Radio>
            <Radio value='5'>Long</Radio>
          </Stack>
        </RadioGroup>

      </Container>
    </>
  )
}

export default HomePage
