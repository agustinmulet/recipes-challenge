import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";
import { ApolloClient, InMemoryCache, ApolloProvider, defaultDataIdFromObject } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    dataIdFromObject(responseObject) {
      switch(responseObject.__typename) {
        case 'Recipe': return `Recipe:${responseObject.id}`;
        default: return defaultDataIdFromObject(responseObject);
      }
    }
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
