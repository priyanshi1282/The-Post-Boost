import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Center,
  Container,
  VStack,
  Text,
  Input,
  Button,
  Flex,
  Avatar,
  Spacer,
  Textarea,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode

} from '@chakra-ui/react';
import { BiTrash } from 'react-icons/bi';
import { useAuth } from 'hooks/auth';
import { FaChevronDown } from 'react-icons/fa';

import {getFirestore, collection, addDoc, onSnapshot,  doc, deleteDoc, getDocs, getDoc, } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { Link as ChakraLink } from '@chakra-ui/react';


export default function Post() {
  const { user } = useAuth();
  const [postLink, setPostLink] = useState('');
  const [postContent, setPostContent] = useState('');
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [userEngagedClicks, setUserEngagedClicks] = useState(0);  
  const [engagementMessage, setEngagementMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [todaysPosts, setTodaysPosts] = useState([]);
  const [previousPosts, setPreviousPosts] = useState([]);
  const [visiblePreviousPostCount, setVisiblePreviousPostCount] = useState(1);



  const postsToLoadPerClick = 2;

  const firestore = getFirestore();
  const { colorMode } = useColorMode();
  
 

   
  const requiredClicksToEngage = 3;
  const handleCreatePost = async () => {

    if (userEngagedClicks < requiredClicksToEngage) {
      setEngagementMessage("you need to engage at least 3 posts before creating a new post.");
      setIsModalOpen(true);
      return;
    }
    
    if (isCooldown) {
      setEngagementMessage("Please wait for the some time (1 min ) before creating another post.");
      setIsModalOpen(true);
      return;
    }
    
    if (!postLink.trim().startsWith('http')) {
      setEngagementMessage("Please enter a valid HTTP link.");
      setIsModalOpen(true);
      return;
    }



    setIsCooldown(true);
    setCooldownTime(60); // 1 minutes in seconds
    const cooldownInterval = setInterval(() => {
      setCooldownTime((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      setIsCooldown(false);
      clearInterval(cooldownInterval);
      setUserEngagedClicks(0);
    }, 60000); // 2 minutes in milliseconds


    if (postLink.trim() !== '' || postContent.trim() !== '') {
      const currentDate = new Date();
      const newPost = {
        link: postLink,
        content: postContent,
        // clickCount: 0, // Initialize click count to 0
        userId: user.uid,
        postDate: currentDate.getTime(), 
      };

      try {
        const docRef = await addDoc(collection(firestore, 'posts'), newPost);
        setFetchedPosts([...fetchedPosts, { id: docRef.id, ...newPost }]);
        setPostLink('');
        setPostContent('');
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };
  const handleLinkClick = async (postId, postLink) => {
    try {
      // Increment click count for the specific post link
      const clicksCollectionRef = collection(firestore, 'posts', postId, 'clicks');
      await addDoc(clicksCollectionRef, {
        userId: user.uid,
        timestamp: new Date().getTime(),
      });

      setUserEngagedClicks(userEngagedClicks + 1);

      console.log('Link click engagement recorded successfully.');
    } catch (error) {
      console.error('Error recording link click engagement:', error);
    }
  };

const fetchPosts = useCallback(async () => {
  const postsQuerySnapshot = await getDocs(collection(firestore, 'posts'));
  const fetchedPostsData = [];

  const currentDate = new Date();

  for (const postDoc of postsQuerySnapshot.docs) {
    const postData = postDoc.data();
    const postDateTimestamp = postData.postDate;
    const postDate = new Date(postDateTimestamp);

    const post = {
      id: postDoc.id,
      ...postData,
      postDate: postDate,
    };

    if (postDate.toDateString() === currentDate.toDateString()) {
      // Fetch user data for today's posts
      const userId = postData.userId;
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      fetchedPostsData.push({
        id: postDoc.id,
        ...postData,
        ...post,
        isToday: true,
        username: userData.username,
        avatar: userData.avatar,
        postDate: postDate,
      });
    } else {
      // Fetch user data for previous posts
      const userId = postData.userId;
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.data();

      fetchedPostsData.push({
        ...post,
        isToday: false,
        username: userData.username, // Adding username for previous posts
        avatar: userData.avatar,     // Adding avatar for previous posts
        postDate: postDate,
      });
    }
  }

  const sortedPosts = fetchedPostsData.sort((a, b) => b.postDate - a.postDate);
  setTodaysPosts(sortedPosts.filter(post => post.isToday));
  setPreviousPosts(sortedPosts.filter(post => !post.isToday));
}, [firestore]);

  
  

  useEffect(() => {
    fetchPosts();

    const currentDate = new Date();
    const nextDay = new Date(currentDate);
    nextDay.setDate(currentDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const timeUntilNextDay = nextDay - currentDate;
      setTimeout(() => {
      setUserEngagedClicks(0);
    }, timeUntilNextDay);

    

    const unsubscribe = onSnapshot(collection(firestore, 'posts'), fetchPosts);
    if (isCooldown && cooldownTime === 0) {
      setIsCooldown(false);
      setUserEngagedClicks(0);
    }
    return () => unsubscribe();
  }, [firestore, fetchPosts, isCooldown, cooldownTime]);

  const handleDeletePost = async (index, isToday) => {
    const postToDelete = isToday ? todaysPosts[index] : previousPosts[index];
    
    if (postToDelete && postToDelete.userId === user.uid) {
      const postRef = doc(firestore, 'posts', postToDelete.id);
      await deleteDoc(postRef);
    } else {
      console.log("You can't delete someone else's post.");
    }
  };
  
  
    




  return (
          <Box bg= "gray.100" minH="100vh" p="4"  overflowY="auto">
          

          {isCooldown && (
                  <Text>Cooldown: {Math.floor(cooldownTime / 60)}:{cooldownTime % 60 < 10 ? '0' : ''}{cooldownTime % 60}</Text>
                )}

                  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Engagement Required</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>{engagementMessage}</Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>

                <Center py = "20">
                        <Container
                          maxW="xl"
                          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                          color={colorMode === 'dark' ? 'white' : 'black'}
                          boxShadow="lg"
                          rounded="lg"
                         
                          p="4"
                        >
                    <VStack spacing="4" align="center">
                      <Text  fontSize="2xl" fontWeight="bold">
                        Create Your Post
                      </Text>
                      <Input
                        type="url"
                        placeholder="Enter a link"
                        value={postLink}
                        onChange={(e) => setPostLink(e.target.value)}
                      />
                      <Textarea
                        placeholder="Feel Free to share your thoughts"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      />
                      <Button colorScheme="blue" onClick={handleCreatePost}>
                        Post
                      </Button>
                    </VStack>
                  </Container>

                </Center>

                <Container maxW="xl" mt="8" >
                  <Box maxHeight="60vh" 
                  >
                  {todaysPosts.length > 0 && (
                    <Text fontSize="xl" fontWeight="bold">
                      Today's Posts
                    </Text>
                  )}
                  {todaysPosts.map((post, index) => (
                    <Box key={index} bg={colorMode === 'dark' ? 'gray.800' : 'white'} boxShadow="md" rounded="lg" p="4" mt="4">
                      <Flex align="center">
                        <Avatar src={post.avatar} alt="User Profile" mr="2" />
                        <VStack align="start">
                          <Text fontWeight="bold">{post.username}</Text>
                          <Text color="">
                            {new Intl.DateTimeFormat('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            }).format(post.postDate)}
                          </Text>
                        </VStack>
                      </Flex> 
                      {post.link && (
                        <ChakraLink
                          color= "blue"
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleLinkClick(post.id, post.link)}
                        >
                          {post.link}
                        </ChakraLink>
                      )}
                      <Text fontWeight= "bold" mt="2">{post.content}</Text>
                      <Flex mt="4" align="center">
                        <Spacer />
                        {post.userId === user.uid && (
                          <IconButton
                            icon={<BiTrash />}
                            colorScheme="blue"
                            aria-label="Delete"
                            onClick={() => handleDeletePost(index,true)}
                            size="sm"
                          />
                        )}
                      </Flex>
                    </Box>
                  ))}


                  {previousPosts.length > 0 && (
                    <Text fontSize="xl" fontWeight="bold" mt="4">
                      Previous Posts
                    </Text>
                  )}
                  {previousPosts.slice(0, visiblePreviousPostCount).map((post, index) => (
                    <Box key={index} bg={colorMode === 'dark' ? 'gray.800' : 'white'} boxShadow="md" rounded="md" p="4" mt="4">
                      <Flex align="center">
                        <Avatar src={post.avatar} alt="User Profile" mr="2" />
                        <VStack align="start">
                          <Text fontWeight="bold">{post.username}</Text>
                          <Text color="">
                            {new Intl.DateTimeFormat('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: true,
                            }).format(post.postDate)}
                          </Text>
                        </VStack>
                      </Flex>
                      {post.link && (
                        <ChakraLink
                          color= "blue"
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleLinkClick(post.id, post.link)}
                        >
                          {post.link}
                        </ChakraLink>
                      )}
                      <Text fontWeight = "bold" mt="2">{post.content}</Text>
                      <Flex mt="4" align="center">
                        <Spacer />
                        {post.userId === user.uid && (
                          <IconButton
                            icon={<BiTrash />}
                            colorScheme="blue"
                            aria-label="Delete"
                            onClick={() => handleDeletePost(index,true)}
                            size="sm"
                          />
                        )}
                      </Flex>
                    </Box>

                  ))}

                  {previousPosts.length > visiblePreviousPostCount && (
                      <Flex 
                              mt="2" 
                              direction="column" 
                              p = "3"
                              alignItems= "center"
                              justifyContent="center" 
                              >
                            
                            <IconButton
                            icon={<FaChevronDown />}
                            colorScheme="blue"
                            onClick={() => setVisiblePreviousPostCount(prevCount => prevCount + postsToLoadPerClick)}
                          />
                    </Flex>
                    )}

                    <Spacer />
                  </Box>
                </Container>
          </Box>
  );
}
