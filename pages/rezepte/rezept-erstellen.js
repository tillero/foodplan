import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthUserContext";
import CreateRecipeForm from "../../components/CreateRecipeForm";
import { showNotification } from "@mantine/notifications";
import Head from "next/head";

const CreateRecipe = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      showNotification({
        title: "Gesperrt",
        message: "Bitte melde dich an um Rezepte zu erstellen",
        color: "yellow",
      });
      router.push("/rezepte");
    }
  }, [authUser, loading, router]);

  const saveRecipe = (recipe) => {
    fetch("/api/createRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...recipe, userId: authUser.uid }),
    }).then((response) => {
      if (response.ok) {
        showNotification({
          title: "Rezept gespeichert",
          message: "Das Rezept wurde zu deiner Rezept Sammlung hinzugefügt",
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

  const emptyRecipe = {
    title: "",
    steps: [""],
    ingredients: [],
    duration: 30,
    portions: 1,
  };

  return (
    <>
      <Head>
        <title>Rezept erstellen</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CreateRecipeForm saveRecipe={saveRecipe} recipe={emptyRecipe} />
    </>
  );
};

export default CreateRecipe;
