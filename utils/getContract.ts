import { ethers } from "ethers";

import getContractAddresses from "utils/getContractAddresses";

import cDaiAbi from "abis/cDAI.json";
import DAIAbi from "abis/DAI.json";

import { Dictionary } from "types/dictionary";

async function getContract(
  web3Provider: ethers.providers.Web3Provider | undefined,
  name: string,
  withSigner: boolean
) {
  let signer:
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcSigner
    | undefined = web3Provider;

  if (withSigner) {
    signer = await web3Provider?.getSigner();
  }

  const abisDictionary: Dictionary<ethers.ContractInterface> = {
    dai: DAIAbi,
    cDai: cDaiAbi
  };

  const contract = new ethers.Contract(
    getContractAddresses(name),
    abisDictionary[name],
    signer
  );

  return contract;
}

export default getContract;
