import React, { useState } from 'react';
import {
  Button,
  Flex,
  Box,
  HStack,
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { DASHBOARD, ABOUT, CONTACT } from 'lib/routes';
import { Link as RouterLink } from 'react-router-dom';
import { useLogout } from 'hooks/auth';

export default function Navbar() {
  const { logout, isLoading } = useLogout();
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Flex
      boxShadow="lg"
      padding="2"
      pos="fixed"
      top="0"
      bgColor="white"
      left="0"
      width="100%"
      borderBottom="1px solid #e1e1e1"
      zIndex="3"
      justifyContent="space-between"
      align="center"
    >
      <Flex px={{ base: '4', md: '10' }} w="full" align="center" maxW="1200px">
        <HStack spacing="4">
          <Link as={RouterLink} to={DASHBOARD}>
            <Image
              src="/images/logo.gif"
              alt="Company Logo"
              h="auto"
              w="50px"
              maxHeight="50px"
              maxWidth="100%"
              borderRadius="50%"
            />
          </Link>
          <Box fontSize="xl" fontWeight="bold" transition="color 0.2s">
            <Link
              as={RouterLink}
              to={DASHBOARD}
              _hover={{
                textDecoration: 'underline',
                color: '#1363DF',
              }}
            >
              HOME
            </Link>
          </Box>
          <Box fontSize="xl" fontWeight="bold" transition="color 0.2s">
            <Link
              as={RouterLink}
              to={ABOUT}
              _hover={{
                textDecoration: 'underline',
                color: '#1363DF',
              }}
            >
              ABOUT
            </Link>
          </Box>
          <Box fontSize="xl" fontWeight="bold" transition="color 0.2s">
            <Link
              as={RouterLink}
              to={CONTACT}
              _hover={{
                textDecoration: 'underline',
                color: '#1363DF',
              }}
            >
              CONTACT
            </Link>
          </Box>
        </HStack>
      </Flex>

      <HStack spacing="4">
        <Menu autoSelect={false}>
          <MenuButton
            as={Button}
            variant="outline"
            size="md"
            bgColor="black"
            color="white"
            _hover={{
              bgColor: '#1363DF',
              color: 'white',
            }}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem as={RouterLink} to="/my-profile">
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
              isLoading={isLoading}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
}
