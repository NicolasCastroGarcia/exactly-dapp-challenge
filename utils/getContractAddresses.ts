import { Dictionary } from "types/dictionary";

export default function getContractAddresses(name: string) {
  const addresses: Dictionary<string> = {
    dai: "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa",
    cDai: "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD"
  };

  return addresses[name];
}
