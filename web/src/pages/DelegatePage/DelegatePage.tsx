import { Link, routes, navigate } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'
import { useEffect, useState } from 'react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Center,
  Container,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Tooltip,
  Text
} from '@chakra-ui/react'
import axios from 'axios'

import DelegateTable from 'src/components/DelegateTable'

const DelegatePage = ({land}) => {

  const { currentUser, isAuthenticated, logOut } = useAuth()

  const [landOwned, setLandOwned] = useState(false)
  const [delegates, setDelegates] = useState({})


  const nameFromAddress = async (address) => {
    // https://orthoverse.me/.redwood/functions/nameFromAddress?id=0x1171fcf25d94Ef1796BE0b78912d502e9823298B
    try {
      const { data: response } =
        await axios.get('https://orthoverse.me/.redwood/functions/nameFromAddress?id=' + address)
        return response
    } catch (error) {
      console.log(error.message)
      return({error: error.message})
    }
  }

  const fetchOwner = async () => {
    try {
      const { data: response } =
        await axios.get('https://orthoverse.io/api/land/search/byName?name=' + land)
        return response
    } catch (error) {
      console.log(error.message)
      return({error: error.message})
    }
  }

  async function addressFromName(name) {
  // https://orthoverse.me/.redwood/functions/addressFromName?name=Cuducdin
  }

   useEffect(() => {
    console.log(land)
    console.log(isAuthenticated)
    console.log(currentUser)
    if (isAuthenticated && typeof currentUser !== 'undefined' && land !== '') {
      // check that page caller actually owns the land to be edited
      fetchOwner().then(result => {
        if ('owner' in result) {
          const retrievedOwner = JSON.parse(result.owner)
          if (currentUser.address.toString() === retrievedOwner[0].toString()) {
            setLandOwned(true)
            let tmpDelegates = {}
            tmpDelegates['0'] = {address: currentUser.address, name: currentUser.name}
            for (let i = 1; i < JSON.parse(result.owner).length; i++) {
              nameFromAddress(landOwned[i]).then(result => {
                if ('name' in result) {
                  tmpDelegates[i.toString()] = {address: landOwned[i], name: result.name}
                }
              })
            }
            setDelegates(tmpDelegates)
          }
        }
      })
    }
  }, [])

  return (
    <>
      <MetaTags title="Delegate" description="Delegate page" />

        <Box bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
          <Flex h={'82px'} alignItems={'center'} justifyContent={'space-between'}>
            <Box>
              <img src="logos/readyplayerdoomed.png" alt="Logo" />
            </Box>
            <Box>
            <Text as='b' fontSize="4xl" color="#e00bf1">{land}</Text>
            </Box>
            <Box>
              <Button colorScheme="teal" 
                onClick={(e) => {
                  navigate(routes.home())
                }}>
                <ArrowLeftIcon /> &nbsp; Back
              </Button>
            </Box>
          </Flex>
        </Box>

      <Container>
        {isAuthenticated && typeof currentUser !== 'undefined' && landOwned !== false ? (
          <Box maxW="640px">
            <Flex>
              <Center>Delegates List</Center>
            </Flex>
            <Flex>
              <DelegateTable  delegates={delegates} />
            </Flex>
          </Box>    
        ) : (
          ''
        )}

        {isAuthenticated && typeof currentUser !== 'undefined' && landOwned === false ? (
          <Box maxW="640px">
            <Flex>
              <Center>Delegates List</Center>
            </Flex>
            <Flex>
              You are not allowed to edit the delegates list for a land you do not own
            </Flex>
          </Box>    
        ) : (
          ''
        )}

        {!(isAuthenticated && typeof currentUser !== 'undefined') ? (
          <Box maxW="640px">
          You need to be logged in to edit delegates
          </Box>
        ) : (
          ''
        )} 
      </Container>
    </>
  )
}

export default DelegatePage
