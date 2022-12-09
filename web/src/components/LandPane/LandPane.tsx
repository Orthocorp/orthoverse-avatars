import { useAuth } from "@redwoodjs/auth"
import { Box, Button, Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

import { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const LandPane = () => {

   // test values
   const test1 = {
        "highest_level": 7,
        "land_name": "Pencanlia",
        "lands": [
            [
                "Telastala",
                "0x2ccc96b3690f88f05b1b99319c4ecfce033dddd5",
                9,
                -29,
                31
            ],
            [
                "Dundallia",
                "0x2830b5a3b5242bc2c64c390594ed971e7ded47d2",
                4,
                -30,
                31
            ],
            [
                "Fangwanina",
                "0x60515c2da6c76ef0b092534fa5be84b07e4da689",
                1,
                0,
                -1
            ],
            [
                "Hathforsmia",
                "0x766c94a76f3652b85358da0d5c039635e20c27d7",
                5,
                -31,
                -1
            ],
            [
                "Unarbsia",
                "0x72d0474ea276e628072624116caea7f05e2b33f9",
                0,
                2,
                -34
            ],
            [
                "Pencanlia",
                "0x4747477222244233277233244222277474740000",
                7,
                0,
                31
            ],
            [
                "Pendasdor",
                "0xcd2081c2e433120cdaa70f4af01fe0b8c53a791c",
                0,
                5,
                -4
            ],
            [
                "Clandiburium",
                "0x2c36dd7bb3e95e7a0219e70737ee8041f22d2081",
                0,
                -35,
                -33
            ],
            [
                "Urvoefia",
                "0x98fa77ec842acd58298e719dd50fefcab9caad1a",
                0,
                23,
                -6
            ]
        ]
    }

  const test2 = {}


  const { isOpen, onOpen, onClose } = useDisclosure()

  const [paneItem, setPaneItem] = useState(-1)

  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()


  useEffect(() => {
    if (currentUser !== 'undefined') {

      // if the user owns no lands, currentUser.lands should be {}
      // otherwise it should be a standard owners.json entry
      // for testing the display I will initially use test1 or test2
      //if (currentUser.lands === {}) {
   
      if (test2 !== {}) {
        setPaneItem(0)
      }
    }
  }, [])

  if (isAuthenticated && (typeof currentUser !== 'undefined')) {
    if (paneItem === -1) {
    return (
        <>
          <Box><Button colorScheme='teal' onClick={onOpen}>Show Land</Button></Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>No land owned</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p='4px'>You currently own no land. This is a travesty!</Box>
                <Box p='4px'>To reveal a land and get your own token visit <Link href="https://orthoverse.io" color='teal.200'>Orthoverse.io <ExternalLinkIcon mx='2px' /></Link>. They typically cost about $2 to $4 US dollars-worth of ETH. There are still plenty left.</Box>
                <Box p='4px'>To buy a land from someone else, try <Link href="https://looksrare.org/collections/0x118aeD2606D02C2545C6D7D2d1021e567cc08922?queryID=4fb0eb13df44b5063fbb611ec30acfb1" color='teal.200' isExternal>Looksrare.org <ExternalLinkIcon mx='2px' /></Link> or some other NFT marketplace.</Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    )} else {
      return (
        <>
          <Box><Button colorScheme='teal' onClick={onOpen}>Show Land</Button></Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{ test1.lands[paneItem][0] }</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{ JSON.stringify(test1.lands[paneItem]) }</ModalBody>
            </ModalContent>
          </Modal>
        </>
    )}
  }else {
      <>
        <Box><Button colorScheme='teal'>Show Land</Button></Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Error</ModalHeader>
            <ModalCloseButton />
            <ModalBody>You should not be able to see this pane if you are not logged in. There has been an error.</ModalBody>
          </ModalContent>
        </Modal>
      </>
  }
}

export default LandPane
