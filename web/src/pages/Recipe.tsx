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
  useNumberInput,
  Spinner,
  Select,
  Button,
  Flex,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { RECIPE_BY_ID, RATE_RECIPE } from "../graphql/Query";
import { Ingredient } from "../graphql/Types";

interface RouteParams {
  id: string;
}

const Recipe: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [quantity, setQuantity] = React.useState<string>("1");
  const [stars, setStars] = React.useState<string>("");

  const { loading, error, data } = useQuery(RECIPE_BY_ID, {
    variables: { recipeId: id },
  });

  const [setRate, { data: mutationData, loading: mutationLoading }] =
    useMutation(RATE_RECIPE);

  const handleChange = (qty: string) => {
    setQuantity(qty);
  };

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: 30,
      precision: 0,
      onChange: (event) => handleChange(event),
      value: quantity,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps({ readOnly: true });

  let content: React.ReactElement | null = null;

  if (loading) {
    content = (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );
  }

  if (error) {
    content = (
      <Text>
        The requested recipe with id {id} doesn't exist or can't be found.
      </Text>
    );
  }

  if (data) {
    const { recipe } = data;
    content = (
      <VStack spacing={4}>
        <Text fontSize="2xl">{recipe.name}</Text>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Ingredients</Tab>
            <Tab>Steps</Tab>
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
                  Portions to calculate
                  <HStack>
                    <Button {...dec}>-</Button>
                    <Input {...input} />
                    <Button {...inc}>+</Button>
                  </HStack>
                  {recipe.ingredients.map((ingredient: Ingredient) => (
                    <Text key={ingredient.name}>
                      {ingredient.name} -{" "}
                      {ingredient.amount *
                        (parseInt(quantity) >= 0 ? parseInt(quantity) : 1)}{" "}
                      {ingredient.unit}
                    </Text>
                  ))}
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
                  <Text>{recipe.steps}</Text>
                  <Text>Did you enjoy cooking this recipe? Rate it!</Text>
                  <Flex w="100%">
                    {!mutationData ? (
                      <>
                        <Select
                          placeholder="Rate the recipe!"
                          value={stars}
                          onChange={(e) => setStars(e.target.value)}
                        >
                          <option value="1">1 ⭐</option>
                          <option value="2">2 ⭐</option>
                          <option value="3">3 ⭐</option>
                          <option value="4">4 ⭐</option>
                          <option value="5">5 ⭐</option>
                        </Select>
                        <Button
                          ml={3}
                          isDisabled={!stars || mutationLoading}
                          onClick={() =>
                            setRate({
                              variables: {
                                recipeId: id,
                                rate: parseInt(stars),
                              },
                            })
                          }
                        >
                          Rate!
                        </Button>
                      </>
                    ) : (
                      <Text>
                        Thanks for rating {mutationData.rate.name}! The new
                        rating for this recipe is{" "}
                        {mutationData.rate.averageRating.toFixed(2)} ⭐
                      </Text>
                    )}
                  </Flex>
                </Grid>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    );
  }

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="85vh" p={3}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="60vh" px={2} justifyItems="center" alignItems="center">
            {content}
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

export default Recipe;
