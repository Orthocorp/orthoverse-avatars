import { useAuth } from "@redwoodjs/auth";
import { Box, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react'

const LoginButton = () => {
  const { currentUser, isAuthenticated, logIn, logOut } = useAuth()

  const onLogin = async (walletType) => {
    try {
      await logIn()
    } catch (e) {
      console.log(e)
    }
  };

  const onLogout = async () => {
    await logOut();
  };

  const truncateAddress = (address) => {
    return address.substring(0,5) + "..." + address.substring(address.length - 4)
  }

  if (isAuthenticated) {
    return (
      <Box><Button onClick={onLogout}>{truncateAddress(currentUser.address)}</Button></Box>
    )
  } else {
    return (
      <Box><Button onClick={onLogin}>Log In</Button></Box>
    )
  }
}

export default LoginButton
