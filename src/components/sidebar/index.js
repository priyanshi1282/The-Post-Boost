

import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Avatar, Divider, IconButton, useColorModeValue, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody } from '@chakra-ui/react';
import { auth } from '../../lib/firebase';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const UserProfileSidebar = () => {
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar open/close
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');

  useEffect(() => {
    // Get the current user's UID from Firebase authentication
    const user = auth.currentUser;

    if (user) {
      // Initialize Firestore and fetch user data from Firestore
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);

      // Fetch user data from Firestore
      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userDataFromFirestore = docSnapshot.data();
            // Extract the desired fields (username, email, avatar)
            const { username, email, avatar } = userDataFromFirestore;
            setUserData({ username, email, avatar });
          } else {
            console.error('User document not found');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box pos="relative">
      <Box
        className={`icon-container ${isSidebarOpen ? 'open' : ''}`}
        pos="fixed"
        top="1rem"
        left="1rem"
        zIndex="20"
        opacity={isSidebarOpen ? 0 : 1} // Initially hide the icon
        transition="opacity 0.3s ease" // Add a smooth transition
        display={['block', 'block', 'none']} // Show the icon only on small screens
      >
        <IconButton
          icon={isSidebarOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Sidebar"
          variant="unstyled"
          onClick={handleSidebarToggle}
          className="icon-button"
        />
      </Box>
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={handleSidebarToggle}>
        {/* ... (same Drawer content as before) */}
      </Drawer>
      {/* Sidebar content */}
      <Box
        pos="fixed"
        left={isSidebarOpen ? '0' : '-250px'} // Move sidebar off-screen when closed
        top="0"
        h="100vh"
        w="250px"
        bg={bgColor}
        boxShadow="md"
        p="10"
        borderRadius="lg"
        transition="left 0.3s ease" // Add a smooth transition
        zIndex="10"
        overflowX="hidden" // Prevent horizontal scrollbar on smaller screens
        display={['none', 'none', 'block']} // Show the sidebar on medium and large screens
      >
        {/* ... (same sidebar content as before) */}
      <Drawer isOpen={isSidebarOpen} placement="left" onClose={handleSidebarToggle}>
            
                  <DrawerOverlay />
                  <DrawerContent bg={bgColor}>
                    <DrawerCloseButton />
                    {/* <DrawerHeader>{userData?.username}</DrawerHeader> */}
                    <DrawerBody>
                      <VStack spacing="2" align="center">
                        <Avatar size="xl" name={userData?.username} src={userData?.avatar} />
                        <Text fontSize="xl" fontWeight="semibold" color={textColor}>
                          {userData?.username}
                        </Text>
                        <Text fontSize="sm" color={textColor}>
                          {userData?.email}
                        </Text>
                      </VStack>
                      <Divider my="4" borderColor={textColor} />
                    </DrawerBody>
                  </DrawerContent>
      </Drawer>
      </Box>
    </Box>
  );
};

export default UserProfileSidebar;




