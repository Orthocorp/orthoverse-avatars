import Jimp from 'jimp'
import { Button, ButtonGroup } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

const Download = ({ img }) => {

  const save = async (downloadImg) => { 
    const jimpImage = await Jimp.read(Buffer.from(downloadImg.split(',')[1], 'base64'))
    jimpImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      fileDownload(buffer, 'orthoverse-avatar.png')
    })
  }

  return (
    <div>
      <Button onClick={(e) => save(img)}>
        Download PNG
      </Button>
    </div>
  )
}

export default Download
