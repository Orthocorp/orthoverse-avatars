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
  Tooltip
} from '@chakra-ui/react'
import { Input, Text, InputGroup, InputRightAddon } from '@chakra-ui/react'
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

import axios from 'axios'

const HomePage = () => {

  const testDesign='{"skintone":{"hsl":{"h":21.93548387096774,"s":0.5776397515527951,"l":0.3156862745098039,"a":1},"hex":"#7f4422","rgb":{"r":127,"g":68,"b":34,"a":1},"hsv":{"h":21.93548387096774,"s":0.7322834645669292,"v":0.4980392156862745,"a":1},"oldHue":21.93548387096774,"source":"hex"},"eyes":"large","eyecolor":{"hsl":{"h":102.76595744680851,"s":0.513660788617271,"l":0.28632570999999996,"a":1},"hex":"#396f24","rgb":{"r":57,"g":111,"b":36,"a":1},"hsv":{"h":102.76595744680851,"s":0.6787000000000001,"v":0.4334,"a":1},"oldHue":102.76595744680851,"source":"hsv"},"beard":"0","beardcolor":{"hex":"#343434"},"top":"4","topcolor":{"hsl":{"h":0,"s":0.2718600953895072,"l":0.39108075,"a":1},"hex":"#7f4949","rgb":{"r":127,"g":73,"b":73,"a":1},"hsv":{"h":0,"s":0.4275,"v":0.4974,"a":1},"oldHue":0,"source":"hsv"},"hair":"1","haircolor":{"hsl":{"h":217.77777777777777,"s":0.5735641227380016,"l":0.3102511,"a":1},"hex":"#22437c","rgb":{"r":34,"g":67,"b":124,"a":1},"hsv":{"h":217.77777777777777,"s":0.7290000000000001,"v":0.4882,"a":1},"oldHue":217.77777777777777,"source":"hsv"},"pants":"4","pantscolor":{"hsl":{"h":0,"s":0.3138014845956776,"l":0.37859601,"a":1},"hex":"#7f4242","rgb":{"r":127,"g":66,"b":66,"a":1},"hsv":{"h":0,"s":0.47769999999999996,"v":0.4974,"a":1},"oldHue":0,"source":"hsv"},"boots":"2","bootscolor":{"hsl":{"h":0,"s":0.020668537892319497,"l":0.13814474999999998,"a":1},"hex":"#242222","rgb":{"r":36,"g":34,"b":34,"a":1},"hsv":{"h":0,"s":0.04050000000000006,"v":0.141,"a":1},"oldHue":0,"source":"hsv"},"accessories":[0,0,0,1,0,0,0,1,0,0,0,0,0,0]}'

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

  const [usedCape, setUsedCape] = useState('cape_invisible.png')
  const [nameInvalid, setNameInvalid] = useState(false)
  const [userName, setUserName] = useState('')
  const [userDesign, setUserDesign] = useState(JSON.parse(testDesign))

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

  function storeDesignIntoUserDesign () {
    setUserDesign(
      {
        "skintone": skintone,
        "eyes": eyes,
        "eyecolor": eyecolor,
        "beard": beard,
        "beardcolor": beardcolor,
        "top": top,
        "topcolor": topcolor,
        "hair": hair,
        "haircolor": haircolor,
        "pants": pants,
        "pantscolor": pantscolor,
        "boots": boots,
        "bootscolor": bootscolor,
        "accessories": accessories
      }
    )
  }

  function loadDesignFromUserDesign() {
    // there's probably a clever way to do this with a loop
    setSkintone(userDesign["skintone"])
    setEyes(userDesign["eyes"])
    setEyecolor(userDesign["eyecolor"])
    setBeard(userDesign["beard"])
    setBeardcolor(userDesign["beardcolor"])
    setTop(userDesign["top"])
    setTopcolor(userDesign["topcolor"])
    setHair(userDesign["hair"])
    setHaircolor(userDesign["haircolor"])
    setPants(userDesign["pants"])
    setPantscolor(userDesign["pantscolor"])
    setBoots(userDesign["boots"])
    setBootscolor(userDesign["bootscolor"])
    setAccessories(userDesign["accessories"])
  }

  // this is the onload effect
  useEffect(() => {
    // set userName on login and set components equal to design object fields
    if (isAuthenticated && typeof currentUser !== 'undefined') {
      if (currentUser !== null && 'name' in currentUser) {
        setUserName(currentUser.name)
        setNameInvalid(false)
        loadDesignFromUserDesign()
        applyChanges()
        // populate accessories if there weren't any loaded
        if (accessories.length === 0) setAccessories(new Array(accsObj.length).fill(0))
      }
    }

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
      setTransformedImage(transformedImage)
      // save design changes to design object
      storeDesignIntoUserDesign()
      console.log("User design object: ", JSON.stringify(userDesign))
    }
  }

  // if any of the features of the avatar model change, we need to apply those
  // changes to the jimpImage for the 3D skin rendering canvas
  useEffect(() => {
    applyChanges()
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

  // when username changes we need to check it's still valid
  useEffect(() => {
    nameValidator(userName)
  }, [userName])

  // check that a login has happened and load design object if it has
  useEffect(() => {
    console.log("Authentication change: ", isAuthenticated)
    if (isAuthenticated) { // we just logged in
      // trigger copying of design object to design components
      loadDesignFromUserDesign()
      applyChanges()
    }
  }, [isAuthenticated])

  // empty useEffect to propagate changes to other state variables used in the body of the page
  useEffect(() => {}, [nameInvalid,usedCape,userDesign])

  function onlyValidCharacters(str) {
    return /^[A-Za-z0-9_]*$/.test(str);
  }

  const nameValidator = async (name) => {
    if (isAuthenticated && typeof currentUser !== 'undefined') {
      if (currentUser !== null && 'name' in currentUser) {
        try {
          const { data: response} =
            await axios.get('http://localhost:8911/nameInDatabase?name=' + name)
            let dbResult = response.name
            // we don't mind if the name is one we are currently using in the database
            if (currentUser.name === name) { 
              dbResult = false
            }
            if ((dbResult === true || userName.length < 3 || onlyValidCharacters(userName) === false)
                && nameInvalid === false) {
              setNameInvalid(true)
            }
            if (userName.length >=3 && 
                onlyValidCharacters(userName) === true &&
                dbResult === false &&
                nameInvalid === true) {
              setNameInvalid(false)
            }
        } catch (error) {
          console.log(error.message)
        }
      } else {
        if (nameInvalid === true) setNameInvalid(false)
      }
    } else {
      if (nameInvalid === true) setNameInvalid(false)
    }
  }

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

  const nameChange = (edit) => {
    setUserName(edit.target.value)
  }

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
                    <InputGroup>
                      <Input 
                        varient='outline'
                        errorBorderColor='red.300'
                        focusBorderColor={nameInvalid ? 'red.300' : 'teal.300'}
                        value={userName}
                        isInvalid={nameInvalid}
                        onChange={(e) => nameChange(e)}
                      />
                    </InputGroup>
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
                    setLevel={setLevel}
                    usedCape={usedCape}
                    setUsedCape={setUsedCape}
                    setUserName={setUserName}
                    />
                  </Flex>
                </Stack>
              ) : (
                ''
              )}
              <LoginButton 
                setLevel={setLevel}
              />
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
              capeUrl={"capes/" + usedCape}
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
              <Download 
                img={transformedImage} 
                nameInvalid={nameInvalid}
                userName={userName}
                userDesign={userDesign}
                usedCape={usedCape}
                level={level}
              />
            </Center>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default HomePage
