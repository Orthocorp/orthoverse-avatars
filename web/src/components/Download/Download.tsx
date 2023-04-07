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
import { toast } from '@redwoodjs/web/toast'

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
      toast('Model saved to the Orthoverse', {
        style: {
            backgroundColor: '#81e68e',
            fontWeight: 'bold'
        }
      })
    },
    onError: (error) => {
      toast.error(error.message, {
        style: {
            backgroundColor: '#e68e81',
            fontweight: 'bold'
        }
      })
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
    const iurr = await jimpImage.clone().crop(40, 20, 4, 12)
    const iurf = await jimpImage.clone().crop(44, 20, 4, 12)
    const iurl = await jimpImage.clone().crop(48, 20, 4, 12)
    const iurb = await jimpImage.clone().crop(52, 20, 4, 12)
    const iulr = await jimpImage.clone().crop(32, 52, 4, 12)
    const iulf = await jimpImage.clone().crop(36, 52, 4, 12)
    const iull = await jimpImage.clone().crop(40, 52, 4, 12)
    const iulb = await jimpImage.clone().crop(44, 52, 4, 12)

    const ourr = await jimpImage.clone().crop(40, 36, 4, 12)
    const ourf = await jimpImage.clone().crop(44, 36, 4, 12)
    const ourl = await jimpImage.clone().crop(48, 36, 4, 12)
    const ourb = await jimpImage.clone().crop(52, 36, 4, 12)
    const oulr = await jimpImage.clone().crop(48, 52, 4, 12)
    const oulf = await jimpImage.clone().crop(52, 52, 4, 12)
    const oull = await jimpImage.clone().crop(56, 52, 4, 12)
    const oulb = await jimpImage.clone().crop(60, 52, 4, 12)

    // legs
    const idrr = await jimpImage.clone().crop(0, 20, 4, 12)
    const idrf = await jimpImage.clone().crop(4, 20, 4, 12)
    const idrl = await jimpImage.clone().crop(8, 20, 4, 12)
    const idrb = await jimpImage.clone().crop(12, 20, 4, 12)
    const idlr = await jimpImage.clone().crop(16, 52, 4, 12)
    const idlf = await jimpImage.clone().crop(20, 52, 4, 12)
    const idll = await jimpImage.clone().crop(24, 52, 4, 12)
    const idlb = await jimpImage.clone().crop(28, 52, 4, 12)

    const odrr = await jimpImage.clone().crop(0, 36, 4, 12)
    const odrf = await jimpImage.clone().crop(8, 36, 4, 12)
    const odrl = await jimpImage.clone().crop(4, 36, 4, 12)
    const odrb = await jimpImage.clone().crop(12, 36, 4, 12)
    const odlr = await jimpImage.clone().crop(0, 52, 4, 12)
    const odlf = await jimpImage.clone().crop(8, 52, 4, 12)
    const odll = await jimpImage.clone().crop(4, 52, 4, 12)
    const odlb = await jimpImage.clone().crop(12, 52, 4, 12)

    jimpImage.mask(flipMask)

    const overlay = await jimpImage
      .clone()
      .blit(iulr, 40, 20)   
      .blit(iulf, 44, 20)  
      .blit(iull, 48, 20)   
      .blit(iulb, 52, 20)
      .blit(iurr, 32, 52)   
      .blit(iurf, 36, 52)  
      .blit(iurl, 40, 52)   
      .blit(iurb, 44, 52)

      .blit(oulr, 44, 36)
      .blit(oulf, 52, 36)
      .blit(oull, 52, 52)
      .blit(oulb, 60, 52)
      .blit(ourr, 40, 36)
      .blit(ourf, 48, 36)
      .blit(ourl, 48, 52)
      .blit(ourb, 56, 52)
  
      .blit(idlr, 0, 20)   
      .blit(idlf, 4, 20)  
      .blit(idll, 8, 20)   
      .blit(idlb, 12, 20)
      .blit(idrr, 16, 52)   
      .blit(idrf, 20, 52)  
      .blit(idrl, 24, 52)   
      .blit(idrb, 28, 52) 

      .blit(odlr, 0, 36)   
      .blit(odlf, 8, 36)  
      .blit(odll, 4, 36)   
      .blit(odlb, 12, 36)
      .blit(odrr, 0, 52)   
      .blit(odrf, 8, 52)  
      .blit(odrl, 4, 52)   
      .blit(odrb, 12, 52) 

    const adjustedImg = await overlay.getBase64Async(Jimp.MIME_PNG) 
    // overlay.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
    //   fileDownload(buffer, 'orthoverse-flip.png')
    // })

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
