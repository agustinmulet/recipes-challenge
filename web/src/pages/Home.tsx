import * as React from "react";
import { Box, Text, VStack, Grid, Input } from "@chakra-ui/react";
import { useLazyQuery } from "@apollo/client";
import { GET_RECIPES } from "../graphql/Query";
import useDebounce from "../hooks/useDebounce";
import RecipesList from "../components/RecipesList";

const Home: React.FC = () => {
  const [value, setValue] = React.useState<string>("");
  const debouncedValue = useDebounce<string>(value);

  const [getRecipes, { loading, error, data }] = useLazyQuery(GET_RECIPES);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (debouncedValue.trim().length > 2) {
      getRecipes({ variables: { searchTerm: debouncedValue.trim() } });
    } else {
      getRecipes();
    }
  }, [debouncedValue]);

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="85vh" p={3}>
        <VStack spacing={4}>
          <Text fontSize="2xl">Recipes Galore!</Text>
          <Input
            type="text"
            value={value}
            onChange={handleChange}
            maxW="50vw"
            placeholder="Please start writing to search 🥕🍕"
          />
          <Box textAlign="center" fontSize="xl">
            <Grid minH="60vh" px={2} justifyItems="center" alignItems="center">
              <RecipesList
                loading={loading}
                recipes={data?.recipes}
                error={error}
              />
            </Grid>
          </Box>
        </VStack>
      </Grid>
    </Box>
  );
};

export default Home;
