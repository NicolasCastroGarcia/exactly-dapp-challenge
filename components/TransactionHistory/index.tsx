import { useEffect, useState } from "react";
import request from "graphql-request";
import { getWalletHistory } from "queries";

import { useWeb3Context } from "context/web3Context";

import { history } from "types/history";
import { historyEntities } from "types/historyEntities";
import { Dictionary } from "types/dictionary";

import Item from "./Item";

function TransactionHistory() {
  const { address } = useWeb3Context();
  const [history, setHistory] = useState<Array<historyEntities> | undefined>(
    undefined
  );

  useEffect(() => {
    if (address) {
      getUserHistory();
    }
  }, [address]);

  async function getUserHistory() {
    const transactionHistory = await request(
      "https://api.thegraph.com/subgraphs/name/juanigallo/cdai-kovan-subgraph",
      getWalletHistory(address!)
    );

    const formattedHistory = formatHistory(transactionHistory);

    setHistory(formattedHistory);
  }

  function formatHistory(history: history) {
    const transactions: Array<historyEntities> = [];

    const titleDictionary: Dictionary<string> = {
      mintEntities: "Mint",
      redeemEntities: "Redeem",
      approvalEntities: "Approval",
      borrowEntities: "Borrow",
      repayEntities: "Repay"
    };

    Object.keys(history).map((title: string) => {
      return history[title].forEach((transaction: historyEntities) => {
        return transactions.push({
          ...transaction,
          type: titleDictionary[title]
        });
      });
    });

    return transactions;
  }
  return (
    <section>
      {address && <h2>Transaction History</h2>}

      {history &&
        history.length > 0 &&
        address &&
        history.map((entry, key) => {
          return <Item key={key} entry={entry} />;
        })}

      {!history && address && <p>Loading...</p>}

      {history && history.length === 0 && address && (
        <p>No se encontraron transacciones para esta billetera</p>
      )}
    </section>
  );
}

export default TransactionHistory;
