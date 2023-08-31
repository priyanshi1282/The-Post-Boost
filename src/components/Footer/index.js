import { Flex , Box,Link,Text } from "@chakra-ui/react";





import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Footer() {
  return (
   <Box>
     <MDBFooter className='text-center text-white'>
      <MDBContainer className='p-4 pb-0'>
        <section className='mb-4'>       
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#3b5998' , }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='facebook-f' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#55acee' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='twitter' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#dd4b39' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='google' />
          </MDBBtn>
          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#ac2bac' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='instagram' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#0082ca' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='linkedin-in' />
          </MDBBtn>

          <MDBBtn
            floating
            className='m-1'
            style={{ backgroundColor: '#333333' }}
            href='#!'
            role='button'
          >
            <MDBIcon fab icon='github' />
          </MDBBtn>

        
        </section>    
      </MDBContainer>

    
      <Box px={4} py={2} textAlign="center">
      <Flex justify="center">
        <Link>
          <Text color="black" fontWeight="medium">
            About Us
          </Text>
        </Link>
        <Link ml={4}>
          <Text color="black" fontWeight="medium">
            Contact Us
          </Text>
        </Link>
        <Link ml={4}>
          <Text color="black" fontWeight="medium">
            Services 
          </Text>
        </Link>
      </Flex>
      
    </Box>

    <Box px={4} py={2} textAlign="center" color = "black">
         <Text fontWeight="medium">
         &copy; {new Date().getFullYear()} The Post Boost. All Rights Reserved.
         </Text>
     </Box>
    
    </MDBFooter>
   </Box>
  );
}