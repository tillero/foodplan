import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Text } from "@mantine/core";

export default function Home() {
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

      <Text>
        {" "}
        Dieser Essensplaner befindet sich in der Erstellung. Bitte navigiere zu{" "}
        <Link
          href="/rezepte"
          style={{ textDecoration: "underline", fontWeight: 500 }}
        >
          Rezepte
        </Link>{" "}
        um zum funktionierenden Teil zu gelangen.
      </Text>
    </div>
  );
}
