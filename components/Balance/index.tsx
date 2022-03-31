import { useEffect, useState } from "react";
import { ethers } from "ethers";

import { useWeb3Context } from "context/web3Context";

import getContract from "utils/getContract";

function Balance() {
  const [balance, setBalance] = useState<string | undefined>(undefined);
  const { web3Provider, address } = useWeb3Context();

  useEffect(() => {
    if (web3Provider && address) {
      getBalance();
    }
  }, [web3Provider, address]);

  async function getBalance() {
    const contract = await getContract(web3Provider, "cDai", false);

    const currentBalance = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const formattedBalance = ethers.utils.formatUnits(currentBalance, decimals);

    setBalance(formattedBalance);
  }

  return (
    <section>
      {address && (
        <div>
          <p>cDAI</p>
          {balance ? <p>{balance} </p> : <p>Loading...</p>}
        </div>
      )}
      {!address && <p>Conecte su billetera</p>}
    </section>
  );
}

export default Balance;
