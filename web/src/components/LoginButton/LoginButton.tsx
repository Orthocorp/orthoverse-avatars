import { useAuth } from "@redwoodjs/auth"
import { Box, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'


import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

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

const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()
  const [error, setError] = useState(false)
  const [errorTitle, setErrorTitle] = useState("")
  const [errorContent, setErrorContent] = useState("")
  

  const onLogin = async (walletType) => {
    try {
      await logIn()
    } catch (e) {
      console.log("Error is " + e)

      if (e === "Error @oneclickdapp/ethereum-auth login(): Error: No Web3 wallet present in the browser. See above error for more details.") {
        console.log("No wallet error")
        setErrorTitle("No Web3 wallet installed")
        setErrorContent("To log on you need to install and configure a Web3 wallet such as <a href='https://metamask.io' style='color: #40e0d0' target='_blank'> MetaMask</a>.")
      } else if (e === "Error @oneclickdapp/ethereum-auth login(): Error: Failed to get signature from user. See above error for more details.") {
        setErrorTitle("Signing cancelled by user")
        setErrorContent("To log on you need to sign the message presented by your wallet.")  
      } else {
        console.log("Some other error")
        setErrorTitle("Unknown error")
        setErrorContent(e)
      }
      setError(true)
      onOpen()
    }
  };




  const onLogout = async () => {
    await logOut();
  };

  const truncateAddress = (address) => {
    return address.substring(0,5) + "..." + address.substring(address.length - 4)
  }

  
  if (!error) {
    if (isAuthenticated) {
      return (
        <Box><Button onClick={onLogout}>{truncateAddress(currentUser.address)}</Button></Box>
      )
    } else {
      return (
        <Box><Button onClick={onLogin}>Log In</Button></Box>
      )
    }
  } else {
    return (
    <>
      <Box><Button onClick={onLogin}>Log In</Button></Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><div dangerouslySetInnerHTML = {{__html: errorTitle}} /></ModalHeader>
          <ModalCloseButton />
          <ModalBody><div dangerouslySetInnerHTML = {{__html: errorContent}} /></ModalBody>
        </ModalContent>
      </Modal>
    </>
    )
  }
}

export default LoginButton
