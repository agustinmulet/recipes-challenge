import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
