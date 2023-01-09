import "../styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { AuthUserProvider } from "../context/AuthUserContext";
import AppHeader from "../components/AppHeader";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthUserProvider>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: "light",
          }}
        >
          <NotificationsProvider>
            <AppHeader>
              <Component {...pageProps} />
            </AppHeader>
          </NotificationsProvider>
        </MantineProvider>
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
