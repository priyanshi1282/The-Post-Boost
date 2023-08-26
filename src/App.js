
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './lib/routes';

import { ColorModeProvider, CSSReset } from '@chakra-ui/react';


function App() {
  return (


   <ChakraProvider>  

    <ColorModeProvider
      options={{
          useSystemColorMode: true, // Enable system color mode
        }}
    >
      <CSSReset />
    </ColorModeProvider>
   
      <RouterProvider router = {router}/>
   </ChakraProvider>
  );
}


export default App;
