import { useEffect, useState } from "react";

import { ethers } from "ethers";

import { useWeb3Context } from "context/web3Context";

import Button from "components/Button";

import { transaction } from "types/transaction";

import getContract from "utils/getContract";
import getContractAddresses from "utils/getContractAddresses";

import styles from "./Mint.module.scss";

function Mint() {
  const { web3Provider, address } = useWeb3Context();
  const [amount, setAmount] = useState<string>("0");
  const [transaction, setTransaction] = useState<transaction | undefined>(
    undefined
  );

  const [allowance, setAllowance] = useState<boolean>(true);

  useEffect(() => {
    checkAllowance();
  }, [address, web3Provider]);

  async function handleDeposit() {
    const contract = await getContract(web3Provider, "cDai", true);

    const tx = await contract.mint(ethers.utils.parseUnits(amount, 18));

    setTransaction({ status: "PENDING" });

    const txCompleted = await tx.wait();

    setTransaction({ status: "COMPLETED", hash: txCompleted.transactionHash });
  }

  async function handleApprove() {
    const contract = await getContract(web3Provider, "dai", true);

    await contract.approve(
      getContractAddresses("cDai"),
      ethers.utils.parseUnits("99999999999999999")
    );

    setAllowance(false);
  }

  async function checkAllowance() {
    const contract = await getContract(web3Provider, "dai", true);

    const allowance = await contract.allowance(
      address,
      getContractAddresses("cDai")
    );

    const formattedAllowance =
      allowance && parseFloat(ethers.utils.formatEther(allowance));

    if (formattedAllowance > parseFloat(amount)) {
      setAllowance(false);
    }
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
              <Button
                text={allowance ? "Approve" : "Mint"}
                onClick={allowance ? handleApprove : handleDeposit}
              />
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
