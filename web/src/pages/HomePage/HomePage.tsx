import { ReactNode } from 'react';
import {
  Box,
  Flex,
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
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Grid, GridItem
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { ConnectKitButton } from 'connectkit'
import AvatarDisplay from 'src/components/AvatarDisplay'
import TonePicker from 'src/components/SkinTonePicker'
import ClothesTonePicker from 'src/components/ClothesTonePicker'
import Download from 'src/components/Download'
import Jimp from 'jimp'
import { useEffect, useState } from 'react'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { initBase64 } from './base'
import {skinTonePalette, eyeColorPalette, beardColorPalette, topColorPalette, hairColorPalette, pantsColorPalette, bootsColorPalette} from './palettes'
import { accsObj } from './accessories'

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



  return (
    <>
      <MetaTags title="Orthoverse Avatars" description="Orthoverse Avatars" />

      <Grid
        templateAreas={`"header header"
          "nav main"
          "nav footer"`}
        gridTemplateRows={'88px 1fr 30px'}
        gridTemplateColumns={'268px 1fr'}
        h='200px'
        gap='1'
      >

      <GridItem area={'header'} bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
          <Box><img src="logos/readyplayerdoomed.png" alt="Logo" /></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <ConnectKitButton />
            </Stack>
          </Flex>
        </Flex>
      </GridItem>

      <GridItem area={'nav'}>
        <Box>
          <Tabs variant='line' orientation='vertical'>
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
                <TonePicker
                  hexColor="#ff0000"
                  colors={skinTonePalette}
                  setColor={setSkintone}
                />
              </TabPanel>

              <TabPanel>
                <TonePicker
                  hexColor="#ff0000"
                  colors={eyeColorPalette}
                  setColor={setEyecolor}
                />
                <Checkbox marginTop='16px'
                 isChecked={(eyes === 'small' ? false : true)}
                 onChange={(e) => setEyeSize(e.target.checked)}
                >
                  Large Eyes
                </Checkbox>
              </TabPanel>

              <TabPanel>
                <TonePicker
                  hexColor="#ff0000"
                  colors={hairColorPalette}
                  setColor={setHaircolor}
                />
                <RadioGroup marginTop='16px' onChange={ setHair } value={ hair }>
                  <Stack direction='column'>
                    <Radio value='0'>None</Radio>
                    <Radio value='1'>Xena</Radio>
                    <Radio value='2'>Brigitte</Radio>            
                    <Radio value='3'>Thor</Radio>
                    <Radio value='4'>Gandalf</Radio>
                    <Radio value='5'>Vizzini</Radio>             
                    <Radio value='6'>Anthony</Radio>
                  </Stack>
                </RadioGroup>
              </TabPanel>

              <TabPanel>
                <TonePicker
                  hexColor="#ff0000"
                  colors={beardColorPalette}
                  setColor={setBeardcolor}
                />
                <RadioGroup marginTop='16px' onChange={ setBeard } value={ beard }>
                  <Stack direction='column'>
                    <Radio value='0'>None</Radio>
                    <Radio value='1'>Moustache</Radio>
                    <Radio value='2'>Handlebar</Radio>        
                    <Radio value='3'>Short</Radio>
                    <Radio value='4'>Medium</Radio>
                    <Radio value='5'>Long</Radio>             
                    <Radio value='6'>Mauricio</Radio>
                    <Radio value='7'>Anthony</Radio>
                  </Stack>
                </RadioGroup>
              </TabPanel>

              <TabPanel>
                <ClothesTonePicker
                  hexColor="#ff0000"
                  colors={topColorPalette}
                  setColor={setTopcolor}
                />
                <RadioGroup marginTop='16px' onChange={ setTop } value={ top }>
                  <Stack direction='column'>
                    <Radio value='0'>None</Radio>
                    <Radio value='1'>Tunic A</Radio>
                    <Radio value='2'>Tunic B</Radio>             
                    <Radio value='3'>Tunic C</Radio>
                    <Radio value='4'>Tunic D</Radio>
                    <Radio value='5'>T-shirt</Radio>
                    <Radio value='6'>Crop-top</Radio>
                    <Radio value='7'>Blazer</Radio>
                    <Radio value='8'>Waistcoat</Radio>
                  </Stack>
                </RadioGroup>
              </TabPanel>

              <TabPanel>
                <ClothesTonePicker
                  hexColor="#ff0000"
                  colors={pantsColorPalette}
                  setColor={setPantscolor}
                />
                <RadioGroup marginTop='16px' onChange={ setPants } value={ pants }>
                  <Stack direction='column'>
                    <Radio value='0'>None</Radio>
                    <Radio value='1'>Robe</Radio>
                    <Radio value='2'>Gown</Radio>            
                    <Radio value='3'>Trousers</Radio>
                    <Radio value='4'>Shorts</Radio>
                    <Radio value='5'>Swimwear</Radio>
                  </Stack>
                </RadioGroup>
              </TabPanel>

              <TabPanel>
                <ClothesTonePicker
                  hexColor="#ff0000"
                  colors={bootsColorPalette}
                  setColor={setBootscolor}
                />
                <RadioGroup marginTop='16px' onChange={ setBoots } value={ boots }>
                  <Stack direction='column'>
                    <Radio value='0'>None</Radio>
                    <Radio value='1'>Heels</Radio>
                    <Radio value='2'>High</Radio>            
                    <Radio value='3'>Shoes</Radio>
                    <Radio value='4'>Tops</Radio>
                    <Radio value='5'>Slippers</Radio>
                  </Stack>
                </RadioGroup>
              </TabPanel>
  
              <TabPanel>
                { accsObj.map((el, i) => <div key={i}><Checkbox
                      key={i}
                      isChecked={accessories[i]}
                     onChange={(e) => flipN(i)}
                    >
                      {el}
                    </Checkbox></div>)
                }
              </TabPanel>

              <TabPanel>
               <Download
                 img={transformedImage} 
               />
              </TabPanel>

            </TabPanels>
          </Tabs>
         </Box>
       </GridItem>

       <GridItem area={'main'}>
         <Box><Center>
           <AvatarDisplay
             className="viewer"
             skinUrl={ transformedImage }
             animation={ animation }
           />
         </Center></Box>
         <Box><Center>
           <RadioGroup onChange={ setAnimation } value={ animation }>
             <Stack direction='row'>
              <Radio value='none'>Still</Radio>
              <Radio value='idle'>Idle</Radio>
              <Radio value='walk'>Walk</Radio>
              <Radio value='run'>Run</Radio>
              <Radio value='fly'>Fly</Radio>
             </Stack>
           </RadioGroup>
         </Center></Box>
       </GridItem>

      </Grid>
    </>
  )
}

export default HomePage
