import { config } from "@onflow/fcl";

const title = "Transaction and Script Builder";
const localnetConfig = {
  "app.detail.title": title,
  "accessNode.api": "http://localhost:8888",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
};

const testnetConfig = {
  "app.detail.title": title,
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
};

const mainnetConfig = {
  "app.detail.title": title,
  "accessNode.api": "https://access-mainnet-beta.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
};

config(testnetConfig);

export const configureForNetwork = (network) => {
  if (network === "testnet") {
    config(localnetConfig);
  } else if (network === "mainnet") {
    config(mainnetConfig);
  }
};
