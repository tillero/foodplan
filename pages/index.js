import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Button, MantineProvider } from "@mantine/core";

export default function Home() {
  const callAPI = async () => {
    try {
      const res = await fetch(
        `https://www.migros.ch/product-display/public/v1/product-detail?storeType=ONLINE&warehouseId=1&region=gmaa&ongoingOfferDate=2022-12-15T00:00:00&migrosIds=196520001500`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>FoodPlan</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Button onClick={callAPI}>Test API</Button>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
