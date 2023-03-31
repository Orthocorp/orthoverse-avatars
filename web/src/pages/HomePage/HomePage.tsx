import { useEffect, useState } from 'react'

import { ArrowRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Center,
  Container,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
} from '@chakra-ui/react'
import { Input, Text } from '@chakra-ui/react'
import Jimp from 'jimp'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import AvatarDisplay from 'src/components/AvatarDisplay'
import DesignPane from 'src/components/DesignPane'
import Download from 'src/components/Download'
import LandPane from 'src/components/LandPane'
import LoginButton from 'src/components/LoginButton'
import { accsObj } from 'src/values/accessories'
import { initBase64 } from 'src/values/base'
import {
  skinTonePalette,
  eyeColorPalette,
  beardColorPalette,
  topColorPalette,
  hairColorPalette,
  pantsColorPalette,
  bootsColorPalette,
} from 'src/values/palettes'

import UserCell from 'src/components/User/UserCell'

const HomePage = () => {

  const { currentUser, isAuthenticated } = useAuth()

  const [level, setLevel] = useState('0')

  const [animation, setAnimation] = useState('none')
  const [jimpImage, setJimpImage] = useState(undefined)
  const [transformedImage, setTransformedImage] = useState(initBase64)

  const [skintone, setSkintone] = useState({
    hex: skinTonePalette[Math.floor(Math.random() * skinTonePalette.length)],
  })
  const [eyecolor, setEyecolor] = useState({
    hex: eyeColorPalette[Math.floor(Math.random() * eyeColorPalette.length)],
  })
  const [beardcolor, setBeardcolor] = useState({
    hex: beardColorPalette[
      Math.floor(Math.random() * beardColorPalette.length)
    ],
  })
  const [topcolor, setTopcolor] = useState({
    hex: beardColorPalette[Math.floor(Math.random() * topColorPalette.length)],
  })
  const [haircolor, setHaircolor] = useState({
    hex: hairColorPalette[Math.floor(Math.random() * hairColorPalette.length)],
  })
  const [pantscolor, setPantscolor] = useState({
    hex: pantsColorPalette[
      Math.floor(Math.random() * pantsColorPalette.length)
    ],
  })
  const [bootscolor, setBootscolor] = useState({
    hex: pantsColorPalette[
      Math.floor(Math.random() * bootsColorPalette.length)
    ],
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
    if (tmp[N] === 0) {
      tmp[N] = 1
    } else {
      tmp[N] = 0
    }
    console.log(tmp)
    setAccessories(tmp)
  }

  useEffect(() => {
    const loadImage = async () => {
      // Creates Jimp image objects for blending together on initial loading of page
      const jimpImage = await Jimp.read('./img/base.png')
      setJimpImage(jimpImage)
      const features = await Jimp.read('./img/features.png')
      const scleraImg = await Jimp.read('./img/eyes/sclera-' + eyes + '.png')
      const irisImg = await Jimp.read('./img/eyes/iris-' + eyes + '.png')
      const topImg = await Jimp.read(
        './img/tops/tunic-' + top.toString() + '.png'
      )
      const beardImg = await Jimp.read(
        './img/beards/beard-' + beard.toString() + '.png'
      )
      const hairImg = await Jimp.read(
        './img/hair/hair-' + hair.toString() + '.png'
      )
      const pantsImg = await Jimp.read(
        './img/pants/pants-' + pants.toString() + '.png'
      )
      const bootsImg = await Jimp.read(
        './img/boots/boots-' + boots.toString() + '.png'
      )
      const accsImg = await Jimp.read('./img/blank-skin.png')
      for (let i = 0; i < accsObj.length; i++) {
        if (accessories[i] == 1) {
          const tmpImg = await Jimp.read(
            './img/accessories/' + accsObj[i][0] + '.png'
          )
          await accsImg.composite(tmpImg, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
          })
        }
      }

      // blends the components together in the correct order
      const overlay = await jimpImage
        .clone()
        .color([{ apply: 'mix', params: [skintone.hex, 75] }])
        .composite(
          features.color([{ apply: 'mix', params: [skintone.hex, 55] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(scleraImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(irisImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(topImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(beardImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(hairImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(pantsImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(bootsImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(accsImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })

      const transformedImage = await overlay.getBase64Async(Jimp.MIME_PNG)
      setTransformedImage(transformedImage)
    }

    loadImage()

    // populate accessories
    setAccessories(new Array(accsObj.length).fill(0))
  }, [])

  const applyChanges = async () => {
    if (jimpImage) {
      // Creates Jimp image objects for blending together when anything changes due
      // to user selections
      const features = await Jimp.read('./img/features.png')
      const scleraImg = await Jimp.read('./img/eyes/sclera-' + eyes + '.png')
      const irisImg = await Jimp.read('./img/eyes/iris-' + eyes + '.png')
      const beardImg = await Jimp.read('./img/beards/beard-' + beard + '.png')
      const topImg = await Jimp.read('./img/tops/tunic-' + top + '.png')
      const hairImg = await Jimp.read(
        './img/hair/hair-' + hair.toString() + '.png'
      )
      const pantsImg = await Jimp.read(
        './img/pants/pants-' + pants.toString() + '.png'
      )
      const bootsImg = await Jimp.read(
        './img/boots/boots-' + boots.toString() + '.png'
      )
      const accsImg = await Jimp.read('./img/blank-skin.png')
      for (let i = 0; i < accsObj.length; i++) {
        if (accessories[i] == 1) {
          const tmpImg = await Jimp.read(
            './img/accessories/' + accsObj[i][0] + '.png'
          )
          await accsImg.composite(tmpImg, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
          })
        }
      }

      const overlay = await jimpImage
        .clone()
        .color([{ apply: 'mix', params: [skintone.hex, 75] }])
        .composite(
          features.color([{ apply: 'mix', params: [skintone.hex, 55] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(scleraImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })
        .composite(
          irisImg.color([{ apply: 'mix', params: [eyecolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(
          topImg.color([{ apply: 'mix', params: [topcolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(
          beardImg.color([{ apply: 'mix', params: [beardcolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(
          hairImg.color([{ apply: 'mix', params: [haircolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(
          pantsImg.color([{ apply: 'mix', params: [pantscolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(
          bootsImg.color([{ apply: 'mix', params: [bootscolor.hex, 75] }]),
          0,
          0,
          { mode: Jimp.BLEND_SOURCE_OVER }
        )
        .composite(accsImg, 0, 0, { mode: Jimp.BLEND_SOURCE_OVER })

      const transformedImage = await overlay.getBase64Async(Jimp.MIME_PNG)
      console.log('Setting transformed image string')
      setTransformedImage(transformedImage)
    }
  }

  useEffect(() => {
    if (jimpImage) {
      applyChanges()
    }
  }, [
    skintone,
    eyecolor,
    eyes,
    beard,
    beardcolor,
    hair,
    haircolor,
    top,
    topcolor,
    pants,
    pantscolor,
    boots,
    bootscolor,
    accessories,
  ])

  // eye size set
  const setEyeSize = (value) => {
    if (value == true) {
      setEyes('large')
    } else {
      setEyes('small')
    }
    console.log('Set eyes to ' + eyes)
  }

  const {
    isOpen: isDesignOpen,
    onOpen: onDesignOpen,
    onClose: onDesignClose,
  } = useDisclosure()
  const btnRef = React.useRef()

  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />

      <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={'82px'} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <img src="logos/readyplayerdoomed.png" alt="Logo" />
          </Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              {isAuthenticated && typeof currentUser !== 'undefined' ? (
                <Stack direction={'row'} spacing={7}>
                  <Flex>
                    <Center>Name:</Center>
                  </Flex>
                  <Flex>
                    <Input value={currentUser.name} readOnly />
                  </Flex>
                  <Flex>
                    <Center>Level:</Center>
                  </Flex>
                  <Flex>
                    <Center>
                      <Text as="b">{level}</Text>
                    </Center>
                  </Flex>
                  <Flex>
                    <LandPane 
                    setLevel = {setLevel}
                    />
                  </Flex>
                </Stack>
              ) : (
                ''
              )}
              <LoginButton />
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Box position="absolute" left="0" top="50%">
        <Button
          size="lg"
          ref={btnRef}
          colorScheme="teal"
          onClick={onDesignOpen}
        >
          <ArrowRightIcon />
        </Button>
      </Box>

      <Drawer
        isOpen={isDesignOpen}
        placement="left"
        onClose={onDesignClose}
        finalFocusRef={btnRef}
      >
        <DrawerContent>
          <DrawerHeader p={0} bg={useColorModeValue('gray.200', 'gray.900')}>
            <Flex
              h={'82px'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Box>
                <img src="logos/readyplayerdoomed.png" alt="Logo" />
              </Box>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <DesignPane
              setSkintone={setSkintone}
              setEyecolor={setEyecolor}
              eyes={eyes}
              setEyeSize={setEyeSize}
              setHaircolor={setHaircolor}
              hair={hair}
              setHair={setHair}
              setBeardcolor={setBeardcolor}
              beard={beard}
              setBeard={setBeard}
              setTopcolor={setTopcolor}
              top={top}
              setTop={setTop}
              setPantscolor={setPantscolor}
              setPants={setPants}
              pants={pants}
              boots={boots}
              setBoots={setBoots}
              setBootscolor={setBootscolor}
              accessories={accessories}
              setAccessories={setAccessories}
              flipN={flipN}
              level={level}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Container maxW="550px">
        <Box>
          <Center>
            <AvatarDisplay
              className="viewer"
              skinUrl={transformedImage}
              animation={animation}
            />
          </Center>
        </Box>
        <Box p="3px" border="1px" borderRadius="8">
          <Box>
            <Center>
              <RadioGroup onChange={setAnimation} value={animation}>
                <Stack direction="row">
                  <Radio value="none">Still</Radio>
                  <Radio value="idle">Idle</Radio>
                  <Radio value="walk">Walk</Radio>
                  <Radio value="run">Run</Radio>
                  <Radio value="fly">Fly</Radio>
                </Stack>
              </RadioGroup>
            </Center>
          </Box>
          <Box>
            <Center>
              <Download img={transformedImage} />
            </Center>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
