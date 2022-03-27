import { useWeb3Context } from "context/web3Context";
import formatWallet from "utils/formatWallet";

function Address() {
  const { address } = useWeb3Context();

  const formattedWallet = address && formatWallet(address);

  return (
    <>
      {address && (
        <p>
          <span>Address: </span>
          {formattedWallet}
        </p>
      )}
    </>
  );
}

export default Address;
