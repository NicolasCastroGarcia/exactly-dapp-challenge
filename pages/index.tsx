import type { NextPage } from "next";
import Head from "next/head";

import ConnectButton from "components/ConnectButton";

import styles from "styles/Home.module.scss";
import Address from "components/Address";
import Mint from "components/Mint";
import TransactionHistory from "components/TransactionHistory";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Exactly - DAPP Challenge</title>
        <meta name="description" content="Done by Nicolas Castro Garcia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Address />
        <ConnectButton />
        <Mint />
        <TransactionHistory />
      </main>
    </div>
  );
};

export default Home;
