import React from "react";
import Navbar from "components/navbar";
import {
  Box,
  Text,
  Container,
  Heading,
  Stack,
  Grid,
  GridItem,
  Image,
  IconButton,
} 
from "@chakra-ui/react";

import { FaArrowLeft } from 'react-icons/fa';
import { DASHBOARD } from 'lib/routes';

import { Link as RouterLink } from "react-router-dom";
import Footer from "components/Footer";

const AboutUs = () => {
  return (
    <Box bgColor="white">
      <Navbar />

      <IconButton
        as={RouterLink}
        to={DASHBOARD}
        aria-label="Back to Home"
        icon={<FaArrowLeft />}
        colorScheme="black"
        variant="ghost"
        size="lg"
        position="fixed"
        top="4rem"
        left="1rem"
        zIndex="1" // Adjust the zIndex to ensure it's above other content
      />

      <Container maxW="xl" py={20}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h1" size="xl" fontWeight="bold" color="gray.800">
              About Us
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Welcome to The Post Boost, a unique social media platform designed to help individuals grow their LinkedIn profiles through mutual engagement. We understand the power of networking and the impact it can have on your professional journey.
            </Text>

            <Text fontSize="lg" color="gray.600" mb={4}>
              Our platform provides a seamless way for peers to connect, engage with, and support each other's LinkedIn posts. By interacting with posts, you're not only boosting engagement but also creating valuable connections that go beyond digital interactions.
            </Text>
            <Text fontSize="lg" color="gray.600" mb={4}>
              We believe in the concept of mutual growth. As you engage with others, they engage with your content, creating a win-win scenario for all involved. With{" "}
              <Text as="span" fontWeight="bold" color="gray.800">
                The Post Boost
              </Text>
              , every interaction is an opportunity to learn, share, and elevate your online presence.
            </Text>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h1" size="xl" fontWeight="bold" color="gray.800">
              Our Story
            </Heading>
            <Text fontSize="lg" color="gray.600">
              We were inspired by the power of networking and the impact it can have on your professional journey. We wanted to create a platform that would help individuals grow their LinkedIn profiles through mutual engagement.
            </Text>
          </Stack>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={8}
          >
            <GridItem>
              <Box textAlign="center">
                <Image
                  rounded="full"
                  src="/images/hi.png"
                  alt="Anuj Pathak - Founder"
                  display={{ base: "none", md: "block" }}
                />
                <Text fontSize="xl" fontWeight="medium" color="gray.800" mt={2}>
                  Anuj 
                </Text>
              </Box>
            </GridItem>
            {/* Add similar GridItem components for other members */}
          </Grid>
        </Stack>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutUs;
