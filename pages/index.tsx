import type { NextPage } from "next";
import Head from "next/head";

import ConnectButton from "components/ConnectButton";
import Address from "components/Address";
import Mint from "components/Mint";
import TransactionHistory from "components/TransactionHistory";

import styles from "styles/Home.module.scss";

import { useWeb3Context } from "context/web3Context";

const Home: NextPage = () => {
  const { network } = useWeb3Context();

  return (
    <div className={styles.container}>
      <Head>
        <title>Exactly - DAPP Challenge</title>
        <meta name="description" content="Done by Nicolas Castro Garcia" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        {network?.name?.toLowerCase() === "kovan" ? (
          <>
            <Address />
            <Mint />
            <TransactionHistory />
          </>
        ) : (
          network?.name && (
            <p className={styles.networkText}>
              You are currently connected to{" "}
              <strong>{network?.name.toUpperCase()}</strong> <br />
              This only works on <strong>KOVAN</strong>
            </p>
          )
        )}
      </main>
    </div>
  );
};

export default Home;
