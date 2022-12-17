import { useEffect, useState } from "react";
import {
  AppShell,
  Avatar,
  Button,
  Navbar,
  Header,
  Title,
  Modal,
  MediaQuery,
  Burger,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { useAuth } from "../context/AuthUserContext";
import SignUp from "./SignUp";
import Login from "./Login";
import { useRouter } from "next/router";

const AppHeader = (props) => {
  const [navOpened, setNavOpened] = useState(false);
  const [signupOpened, setSignupOpened] = useState(false);
  const [loginOpened, setLoginOpened] = useState(false);
  const { authUser, loading, signOut } = useAuth();
  const [isLoggedIn, setLoginStatus] = useState(!loading && authUser);

  const router = useRouter();
  const theme = useMantineTheme();

  useEffect(() => {
    if (!loading && !authUser) {
      setLoginStatus(false);
    } else if (!loading && authUser) {
      setLoginStatus(true);
    }
  }, [authUser, loading]);

  return (
    <>
      <Modal
        opened={signupOpened}
        onClose={() => setSignupOpened(false)}
        title="Registrieren"
      >
        <SignUp setOpened={setSignupOpened} />
      </Modal>
      <Modal
        opened={loginOpened}
        onClose={() => setLoginOpened(false)}
        title="Login"
      >
        <Login setOpened={setLoginOpened} setOpenedRegister={setSignupOpened} />
      </Modal>
      <AppShell
        padding="md"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint={10000}
            hidden={!navOpened}
            width={{ sm: 200, lg: 300 }}
          >
            <Link href="/">So funktioniert es</Link>
            <Link hidden={!isLoggedIn} href="/">
              Profil
            </Link>
            <Link hidden={!isLoggedIn} href="/">
              Haushalt
            </Link>
            <Link hidden={isLoggedIn} href="/">
              Wochenplan
            </Link>
            <Link href="/">Rezepte</Link>
          </Navbar>
        }
        navbarOffsetBreakpoint={10000}
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={navOpened}
                  onClick={() => setNavOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <>
                <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                  <Link href="/">
                    <Title order={2}>FoodPlan</Title>
                  </Link>
                </MediaQuery>

                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <Link href="/">
                    <Title order={3}>FoodPlan</Title>
                  </Link>
                </MediaQuery>
              </>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <div style={{ flexBasis: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "60px",
                    }}
                  >
                    <Link href="/">So funktioniert es</Link>
                    <Link hidden={!isLoggedIn} href="/">
                      Profil
                    </Link>
                    <Link hidden={!isLoggedIn} href="/">
                      Haushalt
                    </Link>
                    <Link hidden={isLoggedIn} href="/">
                      Wochenplan
                    </Link>
                    <Link href="/">Rezepte</Link>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
                <div style={{}}>
                  <div
                    style={{
                      gap: "10px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      hidden={isLoggedIn}
                      onClick={() => setLoginOpened(true)}
                    >
                      Login
                    </Button>
                    <Button
                      hidden={isLoggedIn}
                      variant="outline"
                      onClick={() => setSignupOpened(true)}
                    >
                      Signup
                    </Button>
                    <Button
                      variant="outline"
                      hidden={!isLoggedIn}
                      onClick={() => {
                        signOut();
                        router.reload();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <div style={{ flexBasis: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    {isLoggedIn ? (
                      <Button
                        variant="outline"
                        onClick={() => {
                          signOut();
                          router.reload();
                        }}
                      >
                        Logout
                      </Button>
                    ) : (
                      <Avatar
                        radius="xl"
                        onClick={() => setLoginOpened(true)}
                      />
                    )}
                  </div>
                </div>
              </MediaQuery>
            </div>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {props.children}
      </AppShell>
    </>
  );
};

export default AppHeader;
