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

import { useMutation } from '@redwoodjs/web'
import type { UpdateUserInput } from 'types/graphql'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      address
      cape
      design
      image
      level
      name
    }
  }
`

const Download = ({ img, nameInvalid, userName, usedCape, level, modelToDesign }) => {

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      console.log('User updated')
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  // initial state variable setup
  useEffect(() => {
  }, [])

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

    const flipMask = await Jimp.read(
        './img/flipmask.png'
    )

    // arms
    const iaa1 = await jimpImage.clone().crop(44, 20, 4, 12)
    const iaa2 = await jimpImage.clone().crop(52, 20, 4, 12)
    const iaa3 = await jimpImage.clone().crop(36, 52, 4, 12)
    const iaa4 = await jimpImage.clone().crop(44, 52, 4, 12)
    const iab1 = await jimpImage.clone().crop(40, 20, 4, 12)
    const iab2 = await jimpImage.clone().crop(48, 20, 4, 12)
    const iab3 = await jimpImage.clone().crop(32, 52, 4, 12)
    const iab4 = await jimpImage.clone().crop(40, 52, 4, 12)

    const oaa1 = await jimpImage.clone().crop(44, 36, 4, 12)
    const oaa2 = await jimpImage.clone().crop(52, 36, 4, 12)
    const oaa3 = await jimpImage.clone().crop(52, 52, 4, 12)
    const oaa4 = await jimpImage.clone().crop(60, 52, 4, 12)
    const oab1 = await jimpImage.clone().crop(40, 36, 4, 12)
    const oab2 = await jimpImage.clone().crop(48, 36, 4, 12)
    const oab3 = await jimpImage.clone().crop(48, 52, 4, 12)
    const oab4 = await jimpImage.clone().crop(56, 52, 4, 12)
    // legs
    const iba1 = await jimpImage.clone().crop(20, 52, 4, 12)
    const iba2 = await jimpImage.clone().crop(28, 52, 4, 12)
    const iba3 = await jimpImage.clone().crop(16, 52, 4, 12)
    const iba4 = await jimpImage.clone().crop(24, 52, 4, 12)
    const ibb1 = await jimpImage.clone().crop(4, 20, 4, 12)
    const ibb2 = await jimpImage.clone().crop(12, 20, 4, 12)
    const ibb3 = await jimpImage.clone().crop(0, 20, 4, 12)
    const ibb4 = await jimpImage.clone().crop(8, 20, 4, 12)

    const oba1 = await jimpImage.clone().crop(0, 52, 4, 12)
    const oba2 = await jimpImage.clone().crop(8, 52, 4, 12)
    const oba3 = await jimpImage.clone().crop(4, 52, 4, 12)
    const oba4 = await jimpImage.clone().crop(12, 52, 4, 12)
    const obb1 = await jimpImage.clone().crop(0, 36, 4, 12)
    const obb2 = await jimpImage.clone().crop(8, 36, 4, 12)
    const obb3 = await jimpImage.clone().crop(4, 36, 4, 12)
    const obb4 = await jimpImage.clone().crop(12, 36, 4, 12)

    jimpImage.mask(flipMask)

    const overlay = await jimpImage
      .clone()
      .blit(iaa2, 44, 20)   
      .blit(iaa1, 52, 20)  
      .blit(iaa4, 36, 52)   
      .blit(iaa3, 44, 52)
      .blit(iab2, 40, 20)   
      .blit(iab1, 48, 20)  
      .blit(iab4, 32, 52)   
      .blit(iab3, 40, 52)

      .blit(oaa2, 44, 36)
      .blit(oaa1, 52, 36)
      .blit(oaa4, 52, 52)
      .blit(oaa3, 60, 52)
      .blit(oab2, 40, 36)
      .blit(oab1, 48, 36)
      .blit(oab4, 48, 52)
      .blit(oab3, 56, 52)
  
      .blit(iba2, 20, 52)   
      .blit(iba1, 28, 52)  
      .blit(iba4, 16, 52)   
      .blit(iba3, 24, 52)
      .blit(ibb2, 4, 20)   
      .blit(ibb1, 12, 20)  
      .blit(ibb4, 0, 20)   
      .blit(ibb3, 8, 20) 

      .blit(oba2, 0, 52)   
      .blit(oba1, 8, 52)  
      .blit(oba4, 4, 52)   
      .blit(oba3, 12, 52)
      .blit(obb2, 0, 36)   
      .blit(obb1, 8, 36)  
      .blit(obb4, 4, 36)   
      .blit(obb3, 12, 36) 

/* 
    const ila1 = await jimpImage.clone().crop(0, 20, 4, 12)
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

    const overlay = await jimpImage
      .clone()
      .composite(ila1, 8, 20, {mode: Jimp.BLEND_SOURCE_OVER})   
      .composite(ila2, 0, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ira1, 48, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ira2, 40, 20, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ola1, 8, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ola2, 0, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ora1, 48, 36, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(ora2, 40, 36, {mode: Jimp.BLEND_SOURCE_OVER})  

      .composite(ill1, 24, 52, {mode: Jimp.BLEND_SOURCE_OVER})   
      .composite(ill2, 16, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(irl1, 40, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(irl2, 32, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(oll1, 8, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(oll2, 0, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(orl1, 56, 52, {mode: Jimp.BLEND_SOURCE_OVER})  
      .composite(orl2, 48, 52, {mode: Jimp.BLEND_SOURCE_OVER})  

*/
    const adjustedImg = await overlay.getBase64Async(Jimp.MIME_PNG) 
    overlay.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
      fileDownload(buffer, 'orthoverse-flip.png')
    })

    // This is the final database update piece for the image field
    console.log("image: ", adjustedImg)
    console.log("name: ", userName)
    console.log("design: ", modelToDesign())
    console.log("cape: ", usedCape)
    console.log("level: ", level)

    const mydesign = modelToDesign()

    const input = {
      image: adjustedImg,
      name: userName,
      design: mydesign,
      cape: usedCape,
      level: Number(level)
    }
    const id = currentUser.id
    console.log("About to try to updateUser with ", input)
    console.log("This is for user ", id)
    try {
      updateUser({ variables: { id, input } })
    } catch (error) {
      console.log(error)
    }


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
              Download as Minecraft Skin
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
