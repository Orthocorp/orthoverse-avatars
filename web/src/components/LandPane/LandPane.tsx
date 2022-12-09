import { useAuth } from "@redwoodjs/auth"
import { Box, Center, Button, Link, Image, Text } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { Grid, GridItem } from '@chakra-ui/react'

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
                31,
                "The Prefecture of Telastala"
            ],
            [
                "Dundallia",
                "0x2830b5a3b5242bc2c64c390594ed971e7ded47d2",
                4,
                -30,
                31,
                "The Croft of Dundallia"
            ],
            [
                "Fangwanina",
                "0x60515c2da6c76ef0b092534fa5be84b07e4da689",
                1,
                0,
                -1,
                "The County of Fangwania"
            ],
            [
                "Hathforsmia",
                "0x766c94a76f3652b85358da0d5c039635e20c27d7",
                5,
                -31,
                -1,
                "The Duchy of Hathforsmia"
            ],
            [
                "Unarbsia",
                "0x72d0474ea276e628072624116caea7f05e2b33f9",
                0,
                2,
                -34,
                "The Croft of Unarbsia"
            ],
            [
                "Pencanlia",
                "0x4747477222244233277233244222277474740000",
                7,
                0,
                31,
                "The Kingdom of Pencanlia" 
            ],
            [
                "Pendasdor",
                "0xcd2081c2e433120cdaa70f4af01fe0b8c53a791c",
                0,
                5,
                -4,
                "The Croft of Pensador"
            ],
            [
                "Clandiburium",
                "0x2c36dd7bb3e95e7a0219e70737ee8041f22d2081",
                0,
                -35,
                -33,
                "The Croft of Clandiburium"
            ],
            [
                "Urvoefia",
                "0x98fa77ec842acd58298e719dd50fefcab9caad1a",
                0,
                23,
                -6,
                "The Croft of Urvoefia"
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

  useEffect(() => {
    if (paneItem !== -1) {
     
    }
  }, [paneItem] )

  function goLeft() {
    console.log("Clicked left")
    let pos = paneItem;
    if (pos === 0) {
      pos = test1.lands.length - 1
    } else {
      pos = pos -1
    }
    console.log(pos)
    setPaneItem(pos)
  }

  function goRight() {
    let pos = paneItem;
    if (pos === test1.lands.length - 1) {
      pos = 0
    } else {
      pos = pos + 1
    }
    console.log(pos)
    setPaneItem(pos)
  }

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
                <Box p='4px'>To buy a land from someone else, try <Link href="https://looksrare.org/collections/0x118aeD2606D02C2545C6D7D2d1021e567cc08922?queryID=4fb0eb13df44b5063fbb611ec30acfb1" color='teal.200' isExternal>LooksRare.org <ExternalLinkIcon mx='2px' /></Link> or some other NFT marketplace.</Box>
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
              <ModalHeader><Box><Center><Text as='b' color="teal.300">{ test1.lands[paneItem][5] }</Text></Center></Box></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p="4px"><Center> 
                  <Image src={ 'https://orthoverse.io/api/img/' + 
                              test1.lands[paneItem][1].split("x")[1] + '-' +
                              test1.lands[paneItem][2] + '.png' } alt={ test1.lands[paneItem][0] } />
                </Center></Box>
                <Grid p="4px" templateColumns='repeat(4, 1fr)' gap="4px">
                  <GridItem w='100%' h='16' bg='gray.600' p="1">
                    <Box><Text as='b' fontSize='sm' color="teal.300">Level</Text></Box>
                    <Box><Text as='em'>{ test1.lands[paneItem][2] % 8 }</Text></Box>
                  </GridItem>
                  <GridItem w='100%' h='16' bg='gray.600' p="1">
                    <Box><Text as='b' fontSize='sm' color="teal.300">Lattitude</Text></Box>
                    <Box><Text as='em'>{ test1.lands[paneItem][3] }</Text></Box>
                  </GridItem>
                  <GridItem w='100%' h='16' bg='gray.600' p="1">
                    <Box><Text as='b' fontSize='sm' color="teal.300">Longitude</Text></Box>
                    <Box><Text as='em'>{ test1.lands[paneItem][4] }</Text></Box>
                  </GridItem>
                  <GridItem w='100%' h='16' bg='gray.600' p="1">
                    <Box><Text as='b' fontSize='sm' color="teal.300">Realm</Text></Box>
                    <Box><Text as='em'>{ (test1.lands[paneItem][2] > 7) ? 'Futuristic' : 'Fantasy' }</Text></Box>
                  </GridItem>
                </Grid>
                <Box><Center>
                
                  <Box p='2'>
                    <Button size="md" colorScheme='teal' onClick={ (e) => { goLeft() } }>
                      <ArrowLeftIcon />
                    </Button>
                  </Box>
                  <Box p='2'>
                    <Button size="md" colorScheme='teal' onClick={ (e) => { goRight() } }>
                      <ArrowRightIcon />
                    </Button>
                  </Box>

                </Center></Box>

              </ModalBody>
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
