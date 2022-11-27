import { ReactNode } from 'react';
import {
  Box,
  useColorModeValue,
  useColorMode,
  Flex,
  Stack, HStack, VStack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Radio, RadioGroup,
} from '@chakra-ui/react';

import TonePicker from 'src/components/SkinTonePicker'
import ClothesTonePicker from 'src/components/ClothesTonePicker'

import {skinTonePalette, eyeColorPalette, beardColorPalette, topColorPalette, hairColorPalette, pantsColorPalette, bootsColorPalette} from 'src/values/palettes'
import { accsObj } from 'src/values/accessories'

const DesignPane = (
    {
      skintone, setSkintone, eyecolor, setEyecolor,
      eyes, haircolor, setHaircolor, hair, setHair, beardcolor, setBeardcolor, beard, setBeard,
      setTopcolor, topcolor, top, setTop, setPantscolor, pantscolor, pants, setPants,
      boots, setBoots, bootscolor, setBootscolor, accessories, setAccessories, flipN, setEyeSize
    } 
  ) => {
  return (
  
  <Box>
          <Tabs variant='solid-rounded' colorScheme='purple' orientation='vertical'>
            <TabList bg={useColorModeValue('gray.200', 'gray.900')} >
              <Tab>Skin</Tab>
              <Tab>Eyes</Tab>
              <Tab>Hair</Tab>
              <Tab>Face</Tab>
              <Tab>Tops</Tab>
              <Tab>Pants</Tab>
              <Tab>Boots</Tab>
              <Tab>Extras</Tab>
            </TabList>

            <Flex h="calc(100vh - 82px)">
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
            </TabPanels>
            </Flex>
          </Tabs>
  </Box>

  )
}

export default DesignPane
