import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthUserContext";
import { Text } from "@mantine/core";

const CreateRecipe = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/rezepte");
    }
  }, [authUser, loading, router]);

  return (
    <div>
      <Text>Hallo {!loading && authUser && authUser.email}!</Text>
    </div>
  );
};

export default CreateRecipe;
