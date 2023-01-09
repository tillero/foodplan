import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import RecipeList from "../components/RecipeList";
import { Button, Text, Title, Box, MediaQuery, Space } from "@mantine/core";
import Link from "next/link";

const Recipes = () => {
  const { authUser, loading } = useAuth();
  const [isLoggedIn, setLoginStatus] = useState(!loading && authUser);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      setLoginStatus(false);
    } else if (!loading && authUser) {
      setLoginStatus(true);
    }
  }, [authUser, loading]);

  return (
    <>
      <Head>
        <title>Rezepte</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        sx={{
          maxWidth: "900px",
        }}
        mx="auto"
      >
        {isLoggedIn ? (
          <>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Title order={4}>Meine Rezepte</Title>
            </MediaQuery>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Title order={3}>Meine Rezepte</Title>
            </MediaQuery>
            <Space h="md" />
            <RecipeList uid={authUser?.uid} />
          </>
        ) : (
          <Text>
            Bitte melde dich an um deine Rezepte zu sehen und Rezepte zu
            erstellen
          </Text>
        )}
        <Space h="md" />
        <Link href={"rezepte/rezept-erstellen"}>
          <Button disabled={!isLoggedIn}>Rezept erstellen</Button>
        </Link>
      </Box>
    </>
  );
};

export default Recipes;
