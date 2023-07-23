import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CreateRecipeForm from "../../components/CreateRecipeForm";
import { showNotification } from "@mantine/notifications";
import Head from "next/head";
import { Loader } from "@mantine/core";

const emptyRecipe = {
  title: "",
  steps: [""],
  ingredients: [],
  duration: 30,
  portions: 1,
};

const EditRecipe = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState(emptyRecipe);
  const [recipeloading, setLoading] = useState(false);

  const getRecipes = async () => {
    setLoading(true);
    try {
      const recipe_id = router.query.recipe_name;
      const res = await fetch(`/api/getRecipes/recipe/${recipe_id}`, {
        method: "GET",
      });
      const data = await res.json();
      setRecipe(data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.query.recipe_name) getRecipes();
  }, [router]);

  const saveRecipe = (newRecipe) => {
    fetch("/api/saveRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...newRecipe,
        _id: recipe._id,
      }),
    }).then((response) => {
      if (response.ok) {
        showNotification({
          title: "Rezept gespeichert",
          message: "Das Rezept wurde gespeichert",
          color: "teal",
        });
      } else {
        showNotification({
          title: "Rezept konnte nicht gespeichert werden",
          message: response.statusText,
          color: "red",
        });
      }
    });
    router.push("/rezepte");
  };

  return (
    <>
      <Head>
        <title>Rezept bearbeiten</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {recipeloading || !recipe._id ? (
        <Loader />
      ) : (
        <CreateRecipeForm saveRecipe={saveRecipe} recipe={recipe} />
      )}
    </>
  );
};

export default EditRecipe;
