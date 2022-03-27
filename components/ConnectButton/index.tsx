import Button from "components/Button";
import { useWeb3Context } from "context/web3Context";

function ConnectButton() {
  const { connect, disconnect, address } = useWeb3Context();

  return (
    <>
      {!address && connect && <Button text="connect" onClick={connect} />}
      {address && disconnect && (
        <Button text="disconnect" onClick={disconnect} />
      )}
    </>
  );
}

export default ConnectButton;
