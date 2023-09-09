import React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';

export default function TopEngagers({ topEngagerUsernames } , {engagementCounts}) {
  return (
    <Box
      bg="white"
      boxShadow="md"
      p="4"
      rounded="lg"
      w="250px"
      marginLeft="10px"
      // zIndex="10"
    >
      {topEngagerUsernames.length > 0 && (
        <VStack spacing="2" align="stretch">
          <Text fontSize="xl" fontWeight="bold" mb="2">
            Top Engagers
          </Text>
          {topEngagerUsernames.map((username, index) => (
            <Flex key={index} p="2" alignItems="center" borderRadius="md" bg="gray.100">
              <Text fontWeight="medium" fontSize="sm">
                {username}{' '}
            
                {index === 0 && ' 👑'}
                {index === 1 && ' 🥇'}
                {index === 2 && ' 🥈'}
              </Text>

            
              
            </Flex> 
          ))}
        </VStack>
      )}
    </Box>
  );
}
