import { useEffect, useState } from 'react'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { ArrowRightIcon, ArrowLeftIcon } from '@chakra-ui/icons'
import { Box, Center, Button, Link, Image, Text, Stack } from '@chakra-ui/react'
import { Grid, GridItem, IconButton } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { 
  BsFillShieldFill,
  BsFillShieldSlashFill,
  BsArrowUpRightSquareFill,
  BsFillShieldLockFill,
  BsArrowCounterclockwise
} from 'react-icons/bs'

import { useAuth } from '@redwoodjs/auth'

const LandPane = () => {
  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ test values
  const testA = {
    cape: '0x2830b5a3b5242bc2c64c390594ed971e7ded47d2',
    highest_level: 7,
    land_name: 'Pencanlia',
    lands: [
      [
        'Telastala',
        '0x2ccc96b3690f88f05b1b99319c4ecfce033dddd5',
        9,
        -29,
        31,
        'The Prefecture of Telastala',
      ],
      [
        'Dundallia',
        '0x2830b5a3b5242bc2c64c390594ed971e7ded47d2',
        4,
        -30,
        31,
        'The Croft of Dundallia',
      ],
      [
        'Fangwanina',
        '0x60515c2da6c76ef0b092534fa5be84b07e4da689',
        7,
        0,
        -1,
        'The Kingdom of Fangwania',
      ],
      [
        'Hathforsmia',
        '0x766c94a76f3652b85358da0d5c039635e20c27d7',
        5,
        -31,
        -1,
        'The Duchy of Hathforsmia',
      ],
      [
        'Unarbsia',
        '0x72d0474ea276e628072624116caea7f05e2b33f9',
        0,
        2,
        -34,
        'The Croft of Unarbsia',
      ],
      [
        'Pencanlia',
        '0x4747477222244233277233244222277474740000',
        7,
        0,
        31,
        'The Kingdom of Pencanlia',
      ],
      [
        'Pendasdor',
        '0xcd2081c2e433120cdaa70f4af01fe0b8c53a791c',
        0,
        5,
        -4,
        'The Croft of Pensador',
      ],
      [
        'Clandiburium',
        '0x2c36dd7bb3e95e7a0219e70737ee8041f22d2081',
        0,
        -35,
        -33,
        'The Croft of Clandiburium',
      ],
      [
        'Urvoefia',
        '0x98fa77ec842acd58298e719dd50fefcab9caad1a',
        0,
        23,
        -6,
        'The Croft of Urvoefia',
      ],
    ],
  }

  const testB = {}

  const testC = {
    highest_level: 7,
    land_name: 'Pencanlia',
    cape: '0x2830b5a3b5242bc2c64c390594ed971e7ded47d2',
    lands: [
      [
        'Telastala',
        '0x2ccc96b3690f88f05b1b99319c4ecfce033dddd5',
        9,
        -29,
        31,
        'The Prefecture of Telastala',
      ],
    ],
  }

  const test1 = testA

  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ test values

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [paneItem, setPaneItem] = useState(-1)
  const [usedCape, setUsedCape] = useState('')

  const { currentUser, isAuthenticated } = useAuth()

  useEffect(() => {
    if (currentUser !== 'undefined') {
      // if the user owns no lands, currentUser.lands should be {}
      // otherwise it should be a standard owners.json entry
      // for testing the display I will initially use test1 or test2
      //if (currentUser.lands === {}) {

      if (Object.keys(test1).length !== 0) {
        setPaneItem(0)
        setUsedCape(test1.cape)
      }
    }
  }, [])

  useEffect(() => {
    if (paneItem !== -1) {
      // this is where the cape data should probably be written
    }
  }, [paneItem, usedCape])

  function goLeft() {
    console.log('Clicked left')
    let pos = paneItem
    if (pos === 0) {
      pos = test1.lands.length - 1
    } else {
      pos = pos - 1
    }
    console.log(pos)
    setPaneItem(pos)
  }

  function goRight() {
    let pos = paneItem
    if (pos === test1.lands.length - 1) {
      pos = 0
    } else {
      pos = pos + 1
    }
    console.log(pos)
    setPaneItem(pos)
  }

  function blankCape() {
    test1.cape = ''
    setUsedCape(test1.cape)
  }

  function setCape() {
    test1.cape = test1.lands[paneItem][1]
    setUsedCape(test1.cape)
  }

  // currentUser.address is the ethereum address of the current user
  function checkTokenIsOwned(landAddress) {

  }

  function levelUpTx(landAddress) {

  }

  function transferTx(landAddress) {

  }

  function flipTx(landAddress) {

  }

  if (isAuthenticated && typeof currentUser !== 'undefined') {
    if (paneItem === -1) {
      return (
        <>
          <Box>
            <Button colorScheme="teal" onClick={onOpen}>
              Show Land
            </Button>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>No land owned</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p="4px">
                  You currently own no land. This is a travesty!
                </Box>
                <Box p="4px">
                  To reveal a land and get your own token visit{' '}
                  <Link href="https://orthoverse.io" color="teal.200">
                    Orthoverse.io <ExternalLinkIcon mx="2px" />
                  </Link>
                  . They typically cost about $2 to $4 US dollars-worth of ETH.
                  There are still plenty left.
                </Box>
                <Box p="4px">
                  To buy a land from someone else, try{' '}
                  <Link
                    href="https://looksrare.org/collections/0x118aeD2606D02C2545C6D7D2d1021e567cc08922?queryID=4fb0eb13df44b5063fbb611ec30acfb1"
                    color="teal.200"
                    isExternal
                  >
                    LooksRare.org <ExternalLinkIcon mx="2px" />
                  </Link>{' '}
                  or some other NFT marketplace.
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
    } else {
      return (
        <>
          <Box>
            <Button colorScheme="teal" onClick={onOpen}>
              Show Land
            </Button>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Box>
                  <Center>
                    <Text as="b" color="teal.300">
                      {test1.lands[paneItem][5]}
                    </Text>
                  </Center>
                </Box>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p="4px">
                  <Center>
                    <Image
                      src={
                        'https://orthoverse.io/api/img/' +
                        test1.lands[paneItem][1].split('x')[1] +
                        '-' +
                        test1.lands[paneItem][2] +
                        '.png'
                      }
                      alt={test1.lands[paneItem][0]}
                    />
                  </Center>
                </Box>
                <Grid p="4px" templateColumns="repeat(4, 1fr)" gap="4px">
                  <GridItem w="100%" h="16" bg="gray.600" p="1">
                    <Box>
                      <Stack direction={'row'} spacing={7}>
                        <Text as="b" fontSize="sm" color="teal.300">
                          Level
                        </Text>
                        {test1.lands[paneItem][2] % 8 !== 0 &&
                        usedCape !== test1.lands[paneItem][1] ? (
                          <Box>
                            <IconButton
                              size="xs"
                              icon={<BsFillShieldSlashFill />}
                              color="red.600"
                              onClick={(e) => setCape()}
                            />
                          </Box>
                        ) : (
                          ''
                        )}
                        {test1.lands[paneItem][2] % 8 !== 0 &&
                        usedCape === test1.lands[paneItem][1] ? (
                          <Box>
                            <IconButton
                              size="xs"
                              icon={<BsFillShieldFill />}
                              color="green.400"
                              onClick={(e) => blankCape()}
                            />
                          </Box>
                        ) : (
                          ''
                        )}
                      </Stack>
                    </Box>
                    <Box>
                      <Text as="em">{test1.lands[paneItem][2] % 8} </Text>
                    </Box>
                  </GridItem>
                  <GridItem w="100%" h="16" bg="gray.600" p="1">
                    <Box>
                      <Text as="b" fontSize="sm" color="teal.300">
                        Lattitude
                      </Text>
                    </Box>
                    <Box>
                      <Text as="em">{test1.lands[paneItem][3]}</Text>
                    </Box>
                  </GridItem>
                  <GridItem w="100%" h="16" bg="gray.600" p="1">
                    <Box>
                      <Text as="b" fontSize="sm" color="teal.300">
                        Longitude
                      </Text>
                    </Box>
                    <Box>
                      <Text as="em">{test1.lands[paneItem][4]}</Text>
                    </Box>
                  </GridItem>
                  <GridItem w="100%" h="16" bg="gray.600" p="1">
                    <Box>
                      <Text as="b" fontSize="sm" color="teal.300">
                        Realm
                      </Text>
                    </Box>
                    <Box>
                      <Text as="em">
                        {test1.lands[paneItem][2] > 7
                          ? 'Futuristic'
                          : 'Fantasy'}
                      </Text>
                    </Box>
                  </GridItem>
                </Grid>

                <Grid p="4px" templateColumns="repeat(3, 1fr)" gap="4px">
                  <GridItem w="100%" p="1">
                    <Box>
                      <Button
                        size="md"
                        colorScheme="pink"
                        onClick={(e) => {
                          levelUpTx(test1.lands[paneItem][1])
                        }}
                      >
                          Level Up &nbsp; <Icon as={BsFillShieldLockFill} />
                      </Button>
                    </Box>
                  </GridItem>
                  <GridItem w="100%" p="1">
                    <Box>
                      <Button
                        size="md"
                        colorScheme="pink"
                        onClick={(e) => {
                          flipTx(test1.lands[paneItem][1])
                        }}
                      >
                        Flip Realm &nbsp; <Icon as={BsArrowCounterclockwise} />
                      </Button>
                    </Box>
                  </GridItem>
                  <GridItem w="100%" p="1">
                    <Box>
                      <Button
                        size="md"
                        colorScheme="pink"
                        onClick={(e) => {
                          transferTx(test1.lands[paneItem][1])
                        }}
                      >
                        Send &nbsp; <Icon as={BsArrowUpRightSquareFill} />
                      </Button>
                    </Box>
                  </GridItem>
                </Grid>

                {test1.lands.length > 1 && (
                  <Box>
                    <Center>
                      <Box p="2">
                        <Button
                          size="md"
                          colorScheme="teal"
                          onClick={(e) => {
                            goLeft()
                          }}
                        >
                          <ArrowLeftIcon />
                        </Button>
                      </Box>
                      <Box p="2">
                        <Button
                          size="md"
                          colorScheme="teal"
                          onClick={(e) => {
                            goRight()
                          }}
                        >
                          <ArrowRightIcon />
                        </Button>
                      </Box>
                    </Center>
                  </Box>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
    }
  } else {
    ;<>
      <Box>
        <Button colorScheme="teal">Show Land</Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            You should not be able to see this pane if you are not logged in.
            There has been an error.
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  }
}

export default LandPane
