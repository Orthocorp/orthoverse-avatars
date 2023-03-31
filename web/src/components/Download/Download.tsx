import { useEffect, useState } from 'react'

import { Box, Stack, Button } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import Jimp from 'jimp'
import fileDownload from 'js-file-download'

import { useAuth } from '@redwoodjs/auth'

const Download = ({ img, nameInvalid }) => {
  /* const [message, setMessage] = useState('')

  /* initial state variable setup
  useEffect(() => {
  }, [])

  // refresh message
  useEffect(() => {
  }, [message])
  */

  const { currentUser, isAuthenticated } = useAuth()

  const saveMC = async (downloadImg) => {
    const jimpImage = await Jimp.read(
      Buffer.from(downloadImg.split(',')[1], 'base64')
    )
    jimpImage.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      fileDownload(buffer, 'orthoverse-avatar.png')
    })
  }

  const saveOrth = async (downloadImg) => {
    // Orthoverse skins have mirrored arms and legs
    // I'm sure this could be done with a loop instead...

    const jimpImage = await Jimp.read(
      Buffer.from(downloadImg.split(',')[1], 'base64')
    )
    /*    const ila1 = await jimpImage.clone().crop(0, 20, 4, 12)
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

    console.log(downloadImg)
    // need to write this to the database
    

  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const openModal = async (message) => {
    onOpen()
  }

  if (isAuthenticated && typeof currentUser !== 'undefined') {
    return (
      <>
      <Box>
        <Box p="2">
          <Stack direction="row">
              <Button
                  colorScheme={ nameInvalid ? "gray" : "teal" }
                  onClick={(e) => nameInvalid ? openModal() : saveOrth(img)}
              >
                Save to Orthoverse
              </Button>
            )}
            <Button colorScheme="teal" onClick={(e) => saveMC(img)}>
              Download Minecraft Skin
            </Button>
          </Stack>
        </Box>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save button is disabled</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Your name must satisfy the following:
                <ul>
                  <li>More than two characters long</li>
                  <li>Only alphanumeric characters and underscore allowed</li>
                  <li>Not already in use by another player</li>
                </ul>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      </>
    )
  } else {
    return (
      <>
        <Box p="2">
          <Stack direction="row">
            <Button colorScheme="gray" onClick={(e) => openModal()}>
              Save to Orthoverse
            </Button>
            <Button colorScheme="teal" onClick={(e) => saveMC(img)}>
              Download Minecraft Skin
            </Button>
          </Stack>
        </Box>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Save button is disabled</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                You must log in to save your avatar changes to the Orthoverse.
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
      </>
    )
  }
}

export default Download
