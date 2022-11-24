import { Container } from '@chakra-ui/react'
import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import TonePicker from 'src/components/SkinTonePicker'
import Download from 'src/components/Download'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { Box } from '@chakra-ui/react'

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

  const topColorPalette = [
    "#fe0000", "#0232dc", "#208d10", "#b1b5b8", "#dde3e7",
    "#623412", "#ecefff", "#fee101", "#dd8b1b", "#bdbdbd",
    "#ffd08d", "#d07870", "#974c5b", "#90ac64", "#abc587",
    "#663399", "#4066e0", "#b9bfff", "#bbbbbb", "#f74b00", "#222222"
  ]

  const hairColorPalette = [
    "#030303", "#343434", "#686a69", "#111212", "#9d1bb3",
    "#bc3b15", "#ba6025", "#fe5f35", "#fbcf2b", "#fef87e",
    "#1c0a19", "#92593b", "#553118", "#c98359", "#dfbdb2",
    "#bd3d46", "#eb9fb3", "#579ec8", "#008c48", "#e14674", "#421479"
  ]

  const pantsColorPalette = [
    "#fe0000", "#0232dc", "#208d10", "#b1b5b8", "#dde3e7",
    "#623412", "#ecefff", "#fee101", "#dd8b1b", "#bdbdbd",
    "#ffd08d", "#d07870", "#974c5b", "#90ac64", "#abc587",
    "#663399", "#4066e0", "#b9bfff", "#bbbbbb", "#f74b00", "#222222"
  ]

  const bootsColorPalette = [
    "#fe0000", "#0232dc", "#208d10", "#b1b5b8", "#dde3e7",
    "#623412", "#ecefff", "#fee101", "#dd8b1b", "#bdbdbd",
    "#ffd08d", "#d07870", "#974c5b", "#90ac64", "#abc587",
    "#663399", "#4066e0", "#b9bfff", "#bbbbbb", "#f74b00", "#222222"
  ]

  const [animation, setAnimation] = useState('none')

  const [jimpImage, setJimpImage] = useState(undefined)
  const [transformedImage, setTransformedImage] = useState(initBase64)
  const [features, setFeatures] = useState(undefined)
  const [scleraImg, setScleraImg] = useState(undefined)
  const [irisImg, setIrisImg] = useState(undefined)
  const [beardImg, setBeardImg] = useState(undefined)
  const [topImg, setTopImg] = useState(undefined)
  const [hairImg, setHairImg] = useState(undefined)
  const [pantsImg, setPantsImg] = useState(undefined)
  const [bootsImg, setBootsImg] = useState(undefined)

  const [skintone, setSkintone] = useState({
    "hex": skinTonePalette[Math.floor(Math.random()*skinTonePalette.length)]
  })
  const [eyecolor, setEyecolor] = useState({
    "hex": eyeColorPalette[Math.floor(Math.random()*eyeColorPalette.length)]
  })
  const [beardcolor, setBeardcolor] = useState({
    "hex": beardColorPalette[Math.floor(Math.random()*beardColorPalette.length)]
  })
  const [topcolor, setTopcolor] = useState({
    "hex": beardColorPalette[Math.floor(Math.random()*beardColorPalette.length)]
  })
  const [haircolor, setHaircolor] = useState({
    "hex": hairColorPalette[Math.floor(Math.random()*hairColorPalette.length)]
  })
  const [pantscolor, setPantscolor] = useState({
    "hex": pantsColorPalette[Math.floor(Math.random()*pantsColorPalette.length)]
  })
  const [bootscolor, setBootscolor] = useState({
    "hex": pantsColorPalette[Math.floor(Math.random()*bootsColorPalette.length)]
  })

  const [eyes, setEyes] = useState('small')
  const [beard, setBeard] = useState('0')
  const [top, setTop] = useState('0')
  const [hair, setHair] = useState('0')
  const [pants, setPants] = useState('0')
  const [boots, setBoots] = useState('0')

  useEffect(() => {
    const loadImage = async () => {

      // const sneakers = await Jimp.read("./img/accessories/sneakers.png")

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

      // set base for top
      const topImg = await Jimp.read("./img/tops/tunic-" + top.toString() + ".png")
      setTopImg(topImg)

      // set base for beard
      const beardImg = await Jimp.read("./img/beards/beard-" + beard.toString() + ".png")
      setBeardImg(beardImg)

      // set base for hair
      const hairImg = await Jimp.read("./img/hair/hair-" + hair.toString() + ".png")
      setHairImg(hairImg)

      // set base for pants
      const pantsImg = await Jimp.read("./img/pants/pants-" + pants.toString() + ".png")
      setPantsImg(pantsImg)

      // set base for boots
      const bootsImg = await Jimp.read("./img/boots/boots-" + boots.toString() + ".png")
      setBootsImg(bootsImg)


      const ovrA = await jimpImage.clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .clone().color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrD = await ovrC.composite(topImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrE = await ovrD.composite(beardImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrF = await ovrE.composite(hairImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrG = await ovrF.composite(pantsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrH = await ovrG.composite(bootsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrH.getBase64Async(Jimp.MIME_PNG)
      setTransformedImage(transformedImage)
    }
    
    loadImage()
  }, [])

  const applyChanges = async () => { 
    if (jimpImage) {     

      // const sneakers = await Jimp.read("./img/accessories/sneakers.png")
    
      // set overlays
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      setScleraImg(scleraImg)
      setIrisImg(irisImg)
      const beardImg = await Jimp.read("./img/beards/beard-" + beard + ".png")
      setBeardImg(beardImg)
      const topImg = await Jimp.read("./img/tops/tunic-" + top + ".png")
      setBeardImg(beardImg)
      const hairImg = await Jimp.read("./img/hair/hair-" + hair.toString() + ".png")
      setHairImg(hairImg)
      const pantsImg = await Jimp.read("./img/pants/pants-" + pants.toString() + ".png")
      setPantsImg(pantsImg)
      const bootsImg = await Jimp.read("./img/boots/boots-" + boots.toString() + ".png")
      setBootsImg(bootsImg)

      const ovrA = await jimpImage
        .clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .clone().color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrB = await ovrA.composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrC = await ovrB.composite(irisImg
        .clone()
        .color([{apply:'mix', params: [eyecolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrD = await ovrC.composite(topImg
        .clone()
        .color([{apply:'mix', params: [topcolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrE = await ovrD.composite(beardImg
        .clone()
        .color([{apply:'mix', params: [beardcolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrF = await ovrE.composite(hairImg
        .clone()
        .color([{apply:'mix', params: [haircolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrG = await ovrF.composite(pantsImg
        .clone()
        .color([{apply:'mix', params: [pantscolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      const ovrH = await ovrG.composite(bootsImg
        .clone()
        .color([{apply:'mix', params: [bootscolor.hex, 75]}])
        , 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await ovrH.getBase64Async(Jimp.MIME_PNG)    
      console.log('Setting transformed image string')
      setTransformedImage(transformedImage)
    }
  }

  useEffect(() => {
    if (jimpImage) {
      applyChanges()
    }
  }, [skintone, eyecolor, eyes, beard, beardcolor, hair, haircolor, top, topcolor, pants, pantscolor, boots, bootscolor])

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

        <Tabs variant='enclosed'>
          <TabList>
            <Tab>Skin</Tab>
            <Tab>Eyes</Tab>
            <Tab>Hair</Tab>
            <Tab>Face</Tab>
            <Tab>Tops</Tab>
            <Tab>Pants</Tab>
            <Tab>Boots</Tab>
            <Tab>Extras</Tab>
            <Tab>Save</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h2>Skin Tone</h2>
              <TonePicker
                hexColor="#ff0000"
                colors={skinTonePalette}
                setColor={setSkintone}
              />
            </TabPanel>

            <TabPanel>
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
            </TabPanel>

            <TabPanel>
              <h2>Hair Color</h2>
              <TonePicker
                hexColor="#ff0000"
                colors={hairColorPalette}
                setColor={setHaircolor}
              />
              <RadioGroup onChange={ setHair } value={ hair }>
                <Stack direction='row'>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>One</Radio>
                  <Radio value='2'>Two</Radio>
                </Stack>
                <Stack direction='row'>              
                  <Radio value='3'>Three</Radio>
                  <Radio value='4'>Four</Radio>
                  <Radio value='5'>Five</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>

            <TabPanel>
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
                </Stack>
                <Stack direction='row'>              
                  <Radio value='3'>Short</Radio>
                  <Radio value='4'>Medium</Radio>
                  <Radio value='5'>Long</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>

            <TabPanel>
              <h2>Upper Clothing</h2>
              <TonePicker
                hexColor="#ff0000"
                colors={topColorPalette}
                setColor={setTopcolor}
              />
              <RadioGroup onChange={ setTop } value={ top }>
                <Stack direction='row'>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>Tunic A</Radio>
                  <Radio value='2'>Tunic B</Radio>
                </Stack>
                <Stack direction='row'>              
                  <Radio value='3'>Tunic C</Radio>
                  <Radio value='4'>Tunic D</Radio>
                  <Radio value='5'>T-shirt</Radio>
                </Stack>
                <Stack direction='row'>              
                  <Radio value='6'>Crop-top</Radio>
                  <Radio value='7'>Blazer</Radio>
                  <Radio value='8'>Waistcoat</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>

            <TabPanel>
              <h2>Lower Clothing</h2>
              <TonePicker
                hexColor="#ff0000"
                colors={pantsColorPalette}
                setColor={setPantscolor}
              />
              <RadioGroup onChange={ setPants } value={ pants }>
                <Stack direction='row'>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>Robe</Radio>
                  <Radio value='2'>Gown</Radio>
                </Stack>
                <Stack direction='row'>              
                  <Radio value='3'>Trousers</Radio>
                  <Radio value='4'>Shorts</Radio>
                  <Radio value='5'>Swimwear</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>

            <TabPanel>
              <h2>Boots</h2>
              <TonePicker
                hexColor="#ff0000"
                colors={bootsColorPalette}
                setColor={setBootscolor}
              />
              <RadioGroup onChange={ setBoots } value={ boots }>
                <Stack direction='row'>
                  <Radio value='0'>None</Radio>
                  <Radio value='1'>Heels</Radio>
                  <Radio value='2'>High</Radio>
                </Stack>
                <Stack direction='row'>              
                  <Radio value='3'>Shoes</Radio>
                  <Radio value='4'>Tops</Radio>
                  <Radio value='5'>Slippers</Radio>
                </Stack>
              </RadioGroup>
            </TabPanel>

            <TabPanel>
              <h2>Accessories</h2>
            </TabPanel>

            <TabPanel>
            <h2>Save</h2>
             <Download
               img={transformedImage} 
             />
            </TabPanel>
          </TabPanels>

        </Tabs>

      </Container>
    </>
  )
}

export default HomePage
