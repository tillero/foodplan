import { Container, Group, Space, Center, Text } from "@mantine/core";
import { useState } from "react";
import IngredientCard from "./IngredientCard";
import ProductSearch from "./ProductSearch";

const IngredientList = () => {
  const [ingredients, setIngredients] = useState([]);

  const selectProduct = (product) => {
    const arr = [...ingredients];
    arr.push(product);
    setIngredients(arr);
  };

  //closes both if two are around
  const onClose = (product) => {
    const arr = [...ingredients];
    const filtered = arr.filter((item) => item.uid !== product.uid);
    setIngredients(filtered);
  };

  return (
    <>
      <Group position="left">
        <div style={{ width: "35%", minWidth: "250px" }}>
          <ProductSearch selectProduct={selectProduct} />
        </div>
      </Group>
      <Space h="md" />
      <Group
        position="left"
        sx={{
          maxWidth: "900px",
          backgroundColor: ingredients.length > 0 ? "none" : "lightgrey",
        }}
      >
        {ingredients.length > 0 ? (
          ingredients.map((ingredient, i) => {
            return (
              <IngredientCard product={ingredient} onClose={onClose} key={i} />
            );
          })
        ) : (
          <Container p={0}>
            <Center sx={{ height: 110 }}>
              <Text c="dimmed">Suche nach Zutaten</Text>
            </Center>
          </Container>
        )}
      </Group>
    </>
  );
};

export default IngredientList;
