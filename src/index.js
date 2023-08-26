import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react';
import App from './App'; // Replace with your main app component
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeProvider
        options={{
          useSystemColorMode: true, // Enable system color mode
        }}
      >
        <CSSReset />
        <App />
      </ColorModeProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
