import { Loader, Text, Container, Group, Center } from "@mantine/core";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = ({ uid }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/getRecipes/${uid}`, {
        method: "GET",
      });
      const data = await res.json();
      setRecipes(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Group
          position="left"
          sx={{
            maxWidth: "900px",
          }}
        >
          {recipes.length > 0 ? (
            recipes.map((recipe, i) => {
              return <RecipeCard recipe={recipe} key={i} />;
            })
          ) : (
            <Container p={0}>
              <Center sx={{ height: 110 }}>
                <Text c="dimmed">
                  Du hast noch keine Rezepte in deiner Sammlung. Erstelle eines.
                </Text>
              </Center>
            </Container>
          )}
        </Group>
      )}
    </>
  );
};

export default RecipeList;
