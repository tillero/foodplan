import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Text } from "@mantine/core";

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
    <div>
      <Text>Hallo {!loading && authUser && authUser.email}!</Text>
    </div>
  );
};

export default Recipes;
