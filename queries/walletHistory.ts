export function getWalletHistory(wallet: string) {
  return `
    {
        mintEntities(where:{address: "${wallet}"}) {
            id
            address
            amount
            tokens
        }
        redeemEntities(where:{address: "${wallet}"}) {
            id
            address
            amount
        }
        approvalEntities(where:{address: "${wallet}"}) {
            id
            address
            amount
        }
        borrowEntities(where:{address: "${wallet}"}) {
            id
            address
            amount
        }
        repayEntities(where:{borrower: "${wallet}"}) {
            id
            borrower
            payer
            amount
          }
    }`;
}
