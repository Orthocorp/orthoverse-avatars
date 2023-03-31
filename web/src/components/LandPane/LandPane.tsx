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

import axios from 'axios'

import { useAuth } from '@redwoodjs/auth'
import { Spinner } from '@chakra-ui/react'

const LandPane = ({setLevel}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [paneItem, setPaneItem] = useState(-1)
  const [usedCape, setUsedCape] = useState('cape_invisible.png')

  const { currentUser, isAuthenticated } = useAuth()

  const [loading, setLoading] = useState('loading');
  const [data, setData] = useState([])

  const [test1, setTest1] = useState({})

  function parseLandReturn (data) {
    console.log("Axios data: ", data)
    if (data.length === 0) return {}
    let temp = {lands: []}
    let highest = 0
    let highestName = ''
    let lands = []
    let cape = 'cape_invisible.png'
    data.forEach((land)  => {
      const processedLand = [
        land.name,
        land.tokenId,
        land.level,
        land.x,
        land.y,
        land.description,
        land.crest
      ]
      if (land.level % 8 > highest) {
        highest = land.level
        highestName = land.name
      }
      lands.push(processedLand)
    })
    temp.lands = lands
    temp.highest_level = highest
    temp.land_name = highestName
    setLevel(highest)
    console.log("Temp: ",temp)
    return temp
  }

  useEffect(() => {
    if (currentUser !== 'undefined') {
      console.log("Current user: ", currentUser)
      // if the user owns no lands, currentUser.lands should be {}
      // otherwise it should be a standard owners.json entry
      // for testing the display I will initially use test1 or test2
      //if (currentUser.lands === {}) {

      const fetchData = async () => {
        setLoading('loading')
        try {
          const { data: response} =
            await axios.get('https://orthoverse.io/api/land/owned?owner=' + currentUser.address)
          setTest1(parseLandReturn(response))
          console.log("Test1: ", test1)
        } catch (error) {
          console.log(error.message)
          setLoading('error')
        }
        setLoading('success')
      }

      fetchData().then(result => {
        if (Object.keys(test1).length !== 0) {
          setPaneItem(0)
          // setUsedCape(test1.cape)
        }
      })
    }
  }, [])

  useEffect(() => {
    if ((Object.keys(test1).length !== 0) && (paneItem === -1)) {
       setPaneItem(0)
       // setUsedCape(test1.cape)
    }
    console.log("Loading status: ", loading)
    console.log("usedCape status: ", usedCape)
    console.log("test1 status: ", test1)
    console.log("paneItem status: ", paneItem)
  }, [paneItem, usedCape, test1, loading, setLevel])

  function goLeft() {
    console.log('Clicked left')
    let pos = paneItem
    if (pos === 0) {
      pos = test1.lands.length - 1
    } else {
      pos = pos - 1
    }
    console.log("New position: ", pos)
    setPaneItem(pos)
  }

  function goRight() {
    let pos = paneItem
    if (pos === test1.lands.length - 1) {
      pos = 0
    } else {
      pos = pos + 1
    }
    console.log("New position: ", pos)
    setPaneItem(pos)
  }

  function blankCape() {
    test1.cape = 'cape_invisible.png'
    setUsedCape(test1.cape)
  }

  function setCape() {
    test1.cape = test1.lands[paneItem][6]
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
    if (loading === 'loading') {
      return (
        <>
          <Box>
            <Button colorScheme="teal">Show Land</Button>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Loading</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box p="4px">
                  Loading your lands. Bear with us...
                </Box>
                <Box p="4px">
                  <Spinner />
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
    } else if (loading === 'error') {
      return (
        <>
          <Box>
            <Button colorScheme="teal">Show Land</Button>
          </Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Error</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                Something went wrong while loading your lands. Try refreshing, and
                if that fails, please contact BCGandalf or TheOtherGuy.
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )
    } else if (paneItem === -1) {
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
                        usedCape !== test1.lands[paneItem][6] ? (
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
                        usedCape === test1.lands[paneItem][6] ? (
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
    <>
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
