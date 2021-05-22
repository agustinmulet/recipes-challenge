import * as React from "react";
import {
  Box,
  Link as ChakraLink,
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
import { Link } from "react-router-dom";

import { Recipe } from "../graphql/Types";

interface Props {
  loading: boolean;
  recipes: Recipe[];
  error: any;
  title?: string;
}

const RecipesList: React.FC<Props> = ({ loading, recipes, error, title }) => {
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

  return recipes?.length ? (
    <Box borderRadius="lg" border="1px" p={3}>
      <Table variant="simple" maxW="50vw" size="lg">
        {title && (
          <TableCaption mt={0} placement="top">
            {title}
          </TableCaption>
        )}
        <Thead>
          <Tr>
            <Th>Recipe</Th>
            <Th>Rate</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recipes?.map((recipe) => (
            <Tr key={recipe.id}>
              <Td>
                <ChakraLink as={Link} to={`/recipe/${recipe.id}`}>
                  {recipe.name}
                </ChakraLink>
              </Td>
              <Td>
                {recipe.averageRating.toFixed(2)}{" "}
                <StarIcon mt="auto" mb="3px" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  ) : (
    <Text>No recipes found 😢</Text>
  );
};

export default RecipesList;
