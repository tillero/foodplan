import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import CreateRecipeForm from "../components/CreateRecipeForm";

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

  return <CreateRecipeForm />;
};

export default Recipes;
