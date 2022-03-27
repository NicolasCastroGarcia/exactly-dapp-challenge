import { historyEntities } from "./historyEntities";

export type history = {
  approvalEntities: Array<historyEntities>;
  borrowEntities: Array<historyEntities>;
  mintEntities: Array<historyEntities>;
  redeemEntities: Array<historyEntities>;
  repayEntities: Array<historyEntities>;
  [key: string]: any;
};
