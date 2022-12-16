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
  Select,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { Input, Text } from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons';

import LoginButton from 'src/components/LoginButton'
import LandPane from 'src/components/LandPane'
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

import { useAuth } from "@redwoodjs/auth";

const HomePage = () => {

   //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ test values
   let testA = {
        "cape": "0x2830b5a3b5242bc2c64c390594ed971e7ded47d2",
        "highest_level": 7,
        "land_name": "Pencanlia",
        "lands": [
            [
                "Telastala",
                "0x2ccc96b3690f88f05b1b99319c4ecfce033dddd5",
                9,
                -29,
                31,
                "The Prefecture of Telastala"
            ],
            [
                "Dundallia",
                "0x2830b5a3b5242bc2c64c390594ed971e7ded47d2",
                4,
                -30,
                31,
                "The Croft of Dundallia"
            ],
            [
                "Fangwanina",
                "0x60515c2da6c76ef0b092534fa5be84b07e4da689",
                1,
                0,
                -1,
                "The County of Fangwania"
            ],
            [
                "Hathforsmia",
                "0x766c94a76f3652b85358da0d5c039635e20c27d7",
                5,
                -31,
                -1,
                "The Duchy of Hathforsmia"
            ],
            [
                "Unarbsia",
                "0x72d0474ea276e628072624116caea7f05e2b33f9",
                0,
                2,
                -34,
                "The Croft of Unarbsia"
            ],
            [
                "Pencanlia",
                "0x4747477222244233277233244222277474740000",
                7,
                0,
                31,
                "The Kingdom of Pencanlia" 
            ],
            [
                "Pendasdor",
                "0xcd2081c2e433120cdaa70f4af01fe0b8c53a791c",
                0,
                5,
                -4,
                "The Croft of Pensador"
            ],
            [
                "Clandiburium",
                "0x2c36dd7bb3e95e7a0219e70737ee8041f22d2081",
                0,
                -35,
                -33,
                "The Croft of Clandiburium"
            ],
            [
                "Urvoefia",
                "0x98fa77ec842acd58298e719dd50fefcab9caad1a",
                0,
                23,
                -6,
                "The Croft of Urvoefia"
            ]
        ]
    }

  const testB = {}

  const testC = {
        "highest_level": 4,
        "land_name": "Pencanlia",
        "cape": "0x2830b5a3b5242bc2c64c390594ed971e7ded47d2",
        "lands": [
            [
                "Telastala",
                "0x2ccc96b3690f88f05b1b99319c4ecfce033dddd5",
                9,
                -29,
                31,
                "The Prefecture of Telastala"
            ]
         ]
  }

  let test1 = testA

   //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ test values

  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  const [level, setLevel] = useState('0')
  const [name, setName] = useState('None')

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
  const [accessories, setAccessories] = useState([])

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
          const tmpImg = await Jimp.read("./img/accessories/" + accsObj[i][0] + ".png")
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

    // set player level from database
    setLevel(test1.highest_level)

    // populate accessories
    setAccessories(new Array(accsObj.length).fill(0))

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
          const tmpImg = await Jimp.read("./img/accessories/" + accsObj[i][0] + ".png")
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

  const { isOpen: isDesignOpen, onOpen: onDesignOpen, onClose: onDesignClose } = useDisclosure();
  const btnRef = React.useRef()

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />

      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={'82px'} alignItems={'center'} justifyContent={'space-between'}>
          <Box><img src="logos/readyplayerdoomed.png" alt="Logo" /></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              { isAuthenticated  && (typeof currentUser !== 'undefined' )
                ? <Stack direction={'row'} spacing={7}>
                    <Flex>
                      <Center>Name:</Center>
                    </Flex>
                    <Flex>
                      <Input value={ name } readOnly />
                    </Flex>
                  <Flex><Center>Level:</Center></Flex>
                  <Flex><Center><Text as="b">{ level }</Text></Center></Flex>
                  <Flex><LandPane /></Flex>
                  </Stack>
                : '' }
              <LoginButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Box position="absolute" left="0" top="50%">
      <Button size="lg" ref={btnRef} colorScheme='teal' onClick={onDesignOpen}>
        <ArrowRightIcon />
      </Button>
      </Box>

      <Drawer
        isOpen={isDesignOpen}
        placement='left'
        onClose={onDesignClose}
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
            level={level}
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
         <Box p='3px' border='1px' borderRadius='8'>
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
        </Box>
      </Container>
    </>
  )
}

export default HomePage
