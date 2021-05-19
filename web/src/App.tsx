import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Flex,
  Spacer,
  Link as ChakraLink,
  List,
  ListItem,
  Text,
} from "@chakra-ui/layout";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import Home from "./pages/Home";

export const App = () => (
  <Router>
    <div>
      <Flex p={2}>
        <List p={3}>
          <ListItem>
            <ChakraLink as={Link} to="/">
              <Text>Home</Text>
            </ChakraLink>
          </ListItem>
        </List>
        <Spacer />
        <ColorModeSwitcher justifySelf="flex-end" />
      </Flex>

      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);
