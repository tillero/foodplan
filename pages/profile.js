import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import { Text } from "@mantine/core";

const Profile = () => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/");
    }
  }, [authUser, loading]);

  return (
    <div>
      <Text>Hello {!loading && authUser && authUser.email}!</Text>
    </div>
  );
};

export default Profile;
