import { useState } from "react";

import { ethers } from "ethers";

import { useWeb3Context } from "context/web3Context";

import Button from "components/Button";

import cDaiAbi from "abis/cDAI.json";

import { transaction } from "types/transaction";

import styles from "./Mint.module.scss";

function Mint() {
  const { web3Provider, address } = useWeb3Context();
  const [amount, setAmount] = useState<string>("0");
  const [transaction, setTransaction] = useState<transaction | undefined>(
    undefined
  );

  async function handleDeposit() {
    const signer = await web3Provider?.getSigner();

    const contract = new ethers.Contract(
      "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD",
      cDaiAbi,
      signer
    );

    const tx = await contract.mint(ethers.utils.parseUnits(amount, 18));

    setTransaction({ status: "PENDING" });

    const txCompleted = await tx.wait();

    setTransaction({ status: "COMPLETED", hash: txCompleted.transactionHash });
  }

  return (
    <>
      {address && (
        <section>
          {!transaction && (
            <>
              <input
                type="text"
                value={amount}
                placeholder="0"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <Button text="Mint" onClick={handleDeposit} />
            </>
          )}
          {transaction && (
            <div className={styles.success}>
              <p>{transaction.status}</p>
              {transaction.hash && (
                <>
                  <a
                    href={`https://kovan.etherscan.io/tx/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver en Etherscan
                  </a>
                  <Button
                    text="Mint again"
                    onClick={() => setTransaction(undefined)}
                  />
                </>
              )}
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default Mint;
