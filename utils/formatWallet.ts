function formatWallet(walletAddress: string) {
  return `${walletAddress.substring(0, 5)}...${walletAddress.substring(38)}`;
}

export default formatWallet;
