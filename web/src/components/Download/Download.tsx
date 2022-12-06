import Jimp from 'jimp'
import { Box, Stack, Button, ButtonGroup } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

const Download = ({ img }) => {

  const saveMC = async (downloadImg) => { 
    const jimpImage = await Jimp.read(Buffer.from(downloadImg.split(',')[1], 'base64'))
    jimpImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      fileDownload(buffer, 'orthoverse-avatar.png')
    })
  }

  const saveOrth = async (downloadImg) => { 
    // Orthoverse skins have mirrored arms and legs
    // I'm sure this could be done with a loop instead...
    const jimpImage = await Jimp.read(Buffer.from(downloadImg.split(',')[1], 'base64'))
    /*const ila1 = await jimpImage.clone().crop(0, 20, 4, 12)
    const ila2 = await jimpImage.clone().crop(8, 20, 4, 12)
    const ira1 = await jimpImage.clone().crop(40, 20, 4, 12)
    const ira2 = await jimpImage.clone().crop(48, 20, 4, 12)
    const ola1 = await jimpImage.clone().crop(0, 36, 4, 12)
    const ola2 = await jimpImage.clone().crop(8, 36, 4, 12)
    const ora1 = await jimpImage.clone().crop(40, 36, 4, 12)
    const ora2 = await jimpImage.clone().crop(48, 36, 4, 12)

    const ill1 = await jimpImage.clone().crop(16, 52, 4, 12)
    const ill2 = await jimpImage.clone().crop(24, 52, 4, 12)
    const irl1 = await jimpImage.clone().crop(32, 52, 4, 12)
    const irl2 = await jimpImage.clone().crop(40, 52, 4, 12)
    const oll1 = await jimpImage.clone().crop(0, 52, 4, 12)
    const oll2 = await jimpImage.clone().crop(8, 52, 4, 12)
    const orl1 = await jimpImage.clone().crop(48, 52, 4, 12)
    const orl2 = await jimpImage.clone().crop(56, 52, 4, 12)

    await jimpImage.composite(ila1, 8, 20, {mode: Jimp.BLEND_SOURCE_OVER})   
    await jimpImage.composite(ila2, 0, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ira1, 48, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ira2, 40, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ola1, 8, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ola2, 0, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ora1, 48, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(ora2, 40, 36, {mode: Jimp.BLEND_SOURCE_OVER})  

    await jimpImage.composite(ill1, 24, 52, {mode: Jimp.BLEND_SOURCE_OVER})   
    await jimpImage.composite(ill2, 16, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(irl1, 40, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(irl2, 32, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(oll1, 8, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(oll2, 0, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(orl1, 56, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
    await jimpImage.composite(orl2, 48, 52, {mode: Jimp.BLEND_SOURCE_OVER})  

    */
    //jimpImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    //  fileDownload(buffer, 'orthoverse-avatar.png')
    //})

    console.log(jimpImage.getBase64Async(Jimp.MIME_PNG))
  }

  return (
    <Box>
      <Stack direction='row'> 
        <Button onClick={(e) => saveOrth(img)}>
          Write to Orthoverse
        </Button>
        <Button onClick={(e) => saveMC(img)}>
          Download Minecraft Skin
        </Button>
      </Stack>
    </Box>
  )
}

export default Download
