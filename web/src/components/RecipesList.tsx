import * as React from "react";
import {
  Box,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Text,
  Thead,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

interface Recipe {
  __typename: string;
  name: string;
  id: string;
  averageRating: number;
}

interface Props {
  loading: boolean;
  recipes: Recipe[];
  error: any;
}

const RecipesList: React.FC<Props> = ({ loading, recipes, error }) => {
  if (loading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    );

  if (error) {
    console.log(error);
    return <Text>There was an error trying to fetch the recipes.</Text>;
  }

  if (!recipes) return <Text>Please start writing to search 🥕🍕</Text>;

  return recipes?.length ? (
    <Box borderRadius="lg" border="1px" p={3}>
      <Table variant="simple" maxW="50vw" size="lg">
        <TableCaption mt={0} placement="top">
          Found Recipes
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Recipe</Th>
            <Th>Rate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recipes?.map((recipe) => (
            <Tr key={recipe.id}>
              <Td>{recipe.name}</Td>
              <Td>
                {recipe.averageRating} <StarIcon mt="auto" mb="3px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  ) : (
    <Text>No recipes found</Text>
  );
};

export default RecipesList;
