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

const DelegatePage = ({land}) => {

  const { currentUser, isAuthenticated, logOut } = useAuth()

  const [landOwned, setLandOwned] = useState(false)

   useEffect(() => {
    console.log(land)
    console.log(isAuthenticated)
    console.log(currentUser)
    if (isAuthenticated && typeof currentUser !== 'undefined' && land !== '') {
      const fetchData = async () => {
        try {
          const { data: response } =
            await axios.get('https://orthoverse.io/api/land/search/byName?name=' + land)
            return response
        } catch (error) {
          console.log(error.message)
          return({error: error.message})
        }
      }

      fetchData().then(result => {
        console.log(result)
        if ('owner' in result) {
          if (currentUser.address === JSON.parse(result.owner)[0]) {
            setLandOwned(true)
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

        {isAuthenticated && typeof currentUser !== 'undefined' && landOwned === true ? (
          <Box>
            <Flex>
              <Center>Delegates List</Center>
            </Flex>
            <Flex>
              Look out for a future feature here - you can delegate building to other players (up to seven).
              By adding delegates to your land, they can enter it and dig/place blocks too. It is going to be a
              great tool to allow friends, family, or skilled voxel builders to enhance your land on your behalf.
            </Flex>
          </Box>    
        ) : (
          ''
        )}

        {isAuthenticated && typeof currentUser !== 'undefined' && landOwned === false ? (
          <Box>
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
          <Box>
          You need to be logged in to edit delegates
          </Box>
        ) : (
          ''
        )} 
    </>
  )
}

export default DelegatePage
