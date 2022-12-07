import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Divider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Center,
  Container,
  Button, ButtonGroup,
  Radio, RadioGroup,
  Stack, HStack, VStack,
  Checkbox,
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, ArrowRightIcon } from '@chakra-ui/icons';

import LoginButton from 'src/components/LoginButton'
import AvatarDisplay from 'src/components/AvatarDisplay'
import DesignPane from 'src/components/DesignPane'
import Download from 'src/components/Download'

import Jimp from 'jimp'
import { useEffect, useState } from 'react'
import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import {skinTonePalette, eyeColorPalette, beardColorPalette, topColorPalette, hairColorPalette, pantsColorPalette, bootsColorPalette} from 'src/values/palettes'
import { initBase64 } from 'src/values/base'
import { accsObj } from 'src/values/accessories'

const HomePage = () => {

  const { colorMode, toggleColorMode } = useColorMode();

  const [animation, setAnimation] = useState('none')
  const [jimpImage, setJimpImage] = useState(undefined)
  const [transformedImage, setTransformedImage] = useState(initBase64)

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
  const [accessories, setAccessories] = useState([0, 0, 0, 0, 0, 0, 0])

  function flipN(N) {
    const tmp = [...accessories]
    if (tmp[N] === 0) { tmp[N] = 1} else { tmp[N] = 0}
    console.log(tmp)
    setAccessories(tmp)
  }

  useEffect(() => {
    const loadImage = async () => {
      // Creates Jimp image objects for blending together on initial loading of page
      const jimpImage = await Jimp.read("./img/base.png")
      setJimpImage(jimpImage)
      const features = await Jimp.read("./img/features.png")
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      const topImg = await Jimp.read("./img/tops/tunic-" + top.toString() + ".png")
      const beardImg = await Jimp.read("./img/beards/beard-" + beard.toString() + ".png")
      const hairImg = await Jimp.read("./img/hair/hair-" + hair.toString() + ".png")
      const pantsImg = await Jimp.read("./img/pants/pants-" + pants.toString() + ".png")
      const bootsImg = await Jimp.read("./img/boots/boots-" + boots.toString() + ".png")
      const accsImg = await Jimp.read("./img/blank-skin.png")
      for (let i = 0; i < accsObj.length; i++) {
        if (accessories[i] == 1) {
          const tmpImg = await Jimp.read("./img/accessories/" + accsObj[i] + ".png")
          await accsImg.composite(tmpImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        }
      }

      // blends the components together in the correct order
      const overlay = await jimpImage.clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(irisImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(topImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(beardImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(hairImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(pantsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(bootsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(accsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
      
      const transformedImage = await overlay.getBase64Async(Jimp.MIME_PNG)
      setTransformedImage(transformedImage)
    }
    
    loadImage()
  }, [])

  const applyChanges = async () => { 
    if (jimpImage) {     
      // Creates Jimp image objects for blending together when anything changes due
      // to user selections
      const features = await Jimp.read("./img/features.png")
      const scleraImg = await Jimp.read("./img/eyes/sclera-" + eyes + ".png")
      const irisImg = await Jimp.read("./img/eyes/iris-" + eyes + ".png")
      const beardImg = await Jimp.read("./img/beards/beard-" + beard + ".png")
      const topImg = await Jimp.read("./img/tops/tunic-" + top + ".png")
      const hairImg = await Jimp.read("./img/hair/hair-" + hair.toString() + ".png")
      const pantsImg = await Jimp.read("./img/pants/pants-" + pants.toString() + ".png")
      const bootsImg = await Jimp.read("./img/boots/boots-" + boots.toString() + ".png")
      const accsImg = await Jimp.read("./img/blank-skin.png")
      for (let i = 0; i < accsObj.length; i++) {
        if (accessories[i] == 1) {
          const tmpImg = await Jimp.read("./img/accessories/" + accsObj[i] + ".png")
          await accsImg.composite(tmpImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        }
      }

      const overlay = await jimpImage
        .clone()
        .color([{apply:'mix', params: [skintone.hex, 75]}])
        .composite(features
          .color([{apply:'mix', params: [skintone.hex, 55]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(scleraImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(irisImg
          .color([{apply:'mix', params: [eyecolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(topImg
          .color([{apply:'mix', params: [topcolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(beardImg
          .color([{apply:'mix', params: [beardcolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(hairImg
          .color([{apply:'mix', params: [haircolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(pantsImg
          .color([{apply:'mix', params: [pantscolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(bootsImg
          .color([{apply:'mix', params: [bootscolor.hex, 75]}]), 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
        .composite(accsImg, 0,0, {mode: Jimp.BLEND_SOURCE_OVER})
     
      const transformedImage = await overlay.getBase64Async(Jimp.MIME_PNG)    
      console.log('Setting transformed image string')
      setTransformedImage(transformedImage)
    }
  }

  useEffect(() => {
    if (jimpImage) {
      applyChanges()
    }
  }, [skintone, eyecolor, eyes, beard, beardcolor, hair, haircolor, top, topcolor, pants, pantscolor, boots, bootscolor, accessories])

  // eye size set
  const setEyeSize = (value) => {
    if (value == true) {
      setEyes('large')
    } else {
      setEyes('small')
    }
    console.log("Set eyes to " + eyes)
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef()

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />

      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={'82px'} alignItems={'center'} justifyContent={'space-between'}>
          <Box><img src="logos/readyplayerdoomed.png" alt="Logo" /></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <LoginButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Box position="absolute" left="0" top="50%">
      <Button ref={btnRef} colorScheme='purple' onClick={onOpen}>
        <ArrowRightIcon />
      </Button>
      </Box>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >    
        <DrawerContent>
          <DrawerHeader p={0} bg={useColorModeValue('gray.200', 'gray.900')}>
            <Flex h={'82px'} alignItems={'center'} justifyContent={'space-between'}>
              <Box><img src="logos/readyplayerdoomed.png" alt="Logo" /></Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <DesignPane
            skintone={skintone}
            setSkintone={setSkintone}
            eyecolor={eyecolor}
            setEyecolor={setEyecolor}
            eyes={eyes}
            setEyeSize={setEyeSize}
            haircolor={haircolor}
            setHaircolor={setHaircolor}
            hair={hair}
            setHair={setHair}
            beardcolor={beardcolor}
            setBeardcolor={setBeardcolor}
            beard={beard}
            setBeard={setBeard}
            topcolor={topcolor}
            setTopcolor={setTopcolor}
            top={top}
            setTop={setTop}
            pantscolor={pantscolor}
            setPantscolor={setPantscolor}
            setPants={setPants}
            pants={pants}
            boots={boots}
            setBoots={setBoots}
            bootscolor={bootscolor}
            setBootscolor={setBootscolor}
            accessories={accessories}
            setAccessories={setAccessories}
            flipN={flipN}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container maxW='550px'>
         <Box><Center>
           <AvatarDisplay
             className="viewer"
             skinUrl={ transformedImage }
             animation={ animation }
           />
         </Center></Box>
         <Box>
           <Center>
           <RadioGroup onChange={ setAnimation } value={ animation }>
             <Stack direction='row'>
              <Radio value='none'>Still</Radio>
              <Radio value='idle'>Idle</Radio>
              <Radio value='walk'>Walk</Radio>
              <Radio value='run'>Run</Radio>
              <Radio value='fly'>Fly</Radio>
             </Stack>
           </RadioGroup>
           </Center>
         </Box>
         <Box><Center>
           <Download
             img={transformedImage} 
           />
         </Center></Box>
      </Container>
    </>
  )
}

export default HomePage
