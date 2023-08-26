import React from 'react';
import { Button, Flex, Heading, Image, Center, Text, Stack} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LOGIN, REGISTER } from 'lib/routes';

export default function Home() {
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      


      <Text
        pos="fixed"
        fontSize={{ base: '', md: '3xl', lg: '1xl' }} // Adjust font size for different screen sizes
        fontWeight="bold"
        color="white"
        style={{ padding: '10px' }}
        bgColor="black"
        width={{ base: 'auto', md: 'auto' }} // Adjust width for different screen sizes
        textAlign={{ base: 'start', md: 'start' }} // Align text to the center for mobile and start (left) for larger screens
        zIndex="999" // Ensure the text appears on top of other elements
        top="0" // Position the text at the top of the viewport
        left="0" // Position the text at the left of the viewport
      >
        LOGO
      </Text>

      <Center flex={{ base: 1.5, md: 1 }} bgColor="black" color="white" p={8}>
        <Stack spacing={5} align="center" maxW="450px" textAlign="center">
          <Heading
            bgGradient="linear(to-l, #8CABFF , #DDE6ED)"
            bgClip="text"
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="extrabold"
            textAlign="center"
            textTransform="uppercase"
          >
            Join us now!
          </Heading>

          <Flex direction="column" align="center">
            {/* Use Link components to navigate to login and signup pages */}
            <Link to={LOGIN}>
              <Button bgColor="#0079FF" _hover={{ bg: 'black' }} size="lg" w="200px" mb={4}>
                <Text color="white">Login</Text>
              </Button>
            </Link>
            <Link to={REGISTER}>
              <Button bgColor="#0079FF" _hover={{ bg: 'black' }} size="lg" w="200px">
                <Text color="white">Sign Up</Text>
              </Button>
            </Link>
          </Flex>
        </Stack>
      </Center>

     

      {/* Right Side - Image */}
      <Flex flex={1}>
        <Image
          alt="Login Image"
          objectFit="cover"
          src="./images/the social good.png"
          // src='./images/engage.png'
          style={{ height: '100%', width: '100%' ,  borderRadius: '10px'}}
          
        />
      </Flex>
    </Stack>
  );
}

