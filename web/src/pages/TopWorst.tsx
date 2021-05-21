import * as React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";

import RecipesList from "../components/RecipesList";

import { GET_RECIPES } from "../graphql/Query";

const TopWorst: React.FC = () => {
  const {
    loading: topLoading,
    error: topError,
    data: topRecipes,
  } = useQuery(GET_RECIPES, {
    variables: {
      order: "DESC",
      skip: 0,
      take: 10,
    },
  });

  const {
    loading: worstLoading,
    error: worstError,
    data: worstRecipes,
  } = useQuery(GET_RECIPES, {
    variables: {
      order: "ASC",
      skip: 0,
      take: 10,
    },
  });

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="85vh" p={3}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="60vh" px={2} justifyItems="center" alignItems="center">
            <VStack spacing={4}>
              <Text fontSize="2xl">Top and Worst Recipes</Text>
              <Tabs isFitted variant="enclosed">
                <TabList mb="1em">
                  <Tab>Top 10</Tab>
                  <Tab>Worst 10</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Box textAlign="center" fontSize="xl">
                      <Grid
                        minH="60vh"
                        px={2}
                        justifyItems="center"
                        alignItems="center"
                      >
                        <RecipesList
                          loading={topLoading}
                          recipes={topRecipes?.recipes}
                          error={topError}
                        />
                      </Grid>
                    </Box>
                  </TabPanel>
                  <TabPanel>
                    <Box textAlign="center" fontSize="xl">
                      <Grid
                        minH="60vh"
                        px={2}
                        justifyItems="center"
                        alignItems="center"
                      >
                        <RecipesList
                          loading={worstLoading}
                          recipes={worstRecipes?.recipes}
                          error={worstError}
                        />
                      </Grid>
                    </Box>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default TopWorst;
