import { ethers } from "ethers";

import { Dictionary } from "types/dictionary";
import { historyEntities } from "types/historyEntities";

import formatWallet from "utils/formatWallet";

import styles from "./Item.module.scss";

type Props = {
  entry: historyEntities;
};

function Item({ entry }: Props) {
  const { type, amount, tokens, payer, borrower } = entry;

  //this is hardcoded but it would be cool to make this dynamic
  const decimals: Dictionary<number> = {
    DAI: 18,
    cDAI: 8
  };

  return (
    <div className={styles.item}>
      <p>Transaction: {type}</p>
      {amount && <p>DAI: {ethers.utils.formatUnits(amount, decimals.DAI)}</p>}
      {tokens && <p>cDAI: {ethers.utils.formatUnits(tokens, decimals.cDAI)}</p>}
      {payer && <p>Payer: {formatWallet(payer)}</p>}
      {borrower && <p>Borrower: {formatWallet(borrower)}</p>}
    </div>
  );
}

export default Item;
