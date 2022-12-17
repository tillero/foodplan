import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { AuthUserProvider } from "../context/AuthUserContext";
import AppHeader from "../components/AppHeader";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthUserProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "dark",
          }}
        >
          <AppHeader>
            <Component {...pageProps} />
          </AppHeader>
        </MantineProvider>
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
