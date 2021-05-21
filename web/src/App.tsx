import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Flex,
  Spacer,
  Link as ChakraLink,
  Text,
  HStack,
} from "@chakra-ui/layout";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import TopWorst from "./pages/TopWorst";

const App: React.FC = () => (
  <Router>
    <Flex p={2}>
      <HStack p={3} spacing={4}>
        <ChakraLink
          as={Link}
          to="/"
          _hover={{
            textDecoration: "line-through",
          }}
        >
          <Text fontWeight="bold">Home</Text>
        </ChakraLink>

        <ChakraLink
          as={Link}
          to="/topworst"
          _hover={{
            textDecoration: "line-through",
          }}
        >
          <Text fontWeight="bolder">Top/Worst</Text>
        </ChakraLink>
      </HStack>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>

    <Switch>
      <Route path="/topworst">
        <TopWorst />
      </Route>
      <Route path="/recipe/:id">
        <Recipe />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
