import React from 'react';
import {
  Button,
  Flex,
  Link,
  HStack,
} from '@chakra-ui/react';

import { DASHBOARD, ABOUT } from 'lib/routes';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useLogout } from 'hooks/auth';

export default function Navbar() {
  const location = useLocation();
  const isAboutPage = location.pathname === ABOUT;
  const { logout, isLoading } = useLogout();

  return (
    <Flex
      boxShadow="md"
      padding="4"
      pos="fixed"
      top="0"
      bgColor="white"
      left="0"
      width="100%"
      borderTopColor="white"
      zIndex="3"
      flexDirection="row"
      justify="space-between"
      align="center"
    >
      <Flex
        px={{ base: '4', md: '10' }}
        w="full"
        align="center"
        maxW="1200px"
      >
        <HStack spacing="4">
          <Link
            as={RouterLink}
            to={DASHBOARD}
            fontWeight="bold"
            ml={{ base: '1rem', md: '0' }} // Add margin-left for smaller screens
          >
            The Post Boost
          </Link>
          <Link
            variant="outline"
            size="sm"
            colorScheme="blue"
            fontSize="sm"
            fontWeight="bold"
            as={RouterLink}
            to={DASHBOARD}
            _hover={{
              textDecoration: 'underline',
            }}
            ml={{ base: '1rem', md: '0' }} // Add margin-left for smaller screens
          >
            Home
          </Link>
          <Link
            variant="outline"
            size="sm"
            colorScheme="blue"
            fontSize="sm"
            fontWeight="bold"
            as={RouterLink}
            to={ABOUT}
            _hover={{
              textDecoration: 'underline',
            }}
            ml={{ base: '1rem', md: '0' }} // Add margin-left for smaller screens
          >
            About
          </Link>
        </HStack>
      </Flex>

      {!isAboutPage && (
        <HStack spacing="4">
          <Button
            variant="outline"
            size="sm"
            colorScheme="blue"
            onClick={logout}
            isLoading={isLoading}
          >
            Logout
          </Button>
        </HStack>
      )}
    </Flex>
  );
}
