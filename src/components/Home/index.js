import React from 'react';
import { Text, Button, Center, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { LOGIN, REGISTER } from 'lib/routes';

export default function Home() {
  return (
    <Center minH="100vh">
      <Stack spacing={8} direction={{ base: 'column', md: 'row' }} align="center">
        <div style={{ flex: 1 }}>
          {/* Embed the video using the <video> element */}
          <video autoPlay muted loop width="100%" style={{ borderRadius: '10px', maxWidth: '800px' , border: '2px solid #000' }}>
            <source src="images/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      
        <Stack align={{ base: 'center', md: 'flex-start' }} p={4} mt={4}>
          <Stack spacing={4} align="center">
          <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              color="black"
              
              textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)" 
              textAlign="center" 
            >
              Join us !
            </Text>
            <Link to={LOGIN}>
              <Button bgColor="#25316D" _hover={{ bg: 'black' }} size="md" w="250px">
                <Text fontWeight = "bold" fontSize = "20px" color="white" textAlign="center">Login</Text>
              </Button>
            </Link>
            <Link to={REGISTER}>
              <Button bgColor="#25316D" _hover={{ bg: 'black' }} size="md" w="250px">
                <Text fontWeight = "bold" fontSize = "20px" color="white" textAlign="center">Sign Up</Text>
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
