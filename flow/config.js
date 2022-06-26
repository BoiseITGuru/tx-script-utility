import { config } from "@onflow/fcl";

const title = "Transaction and Script Builder";
export var currentNetwork

const emulatorConfig = {
  "app.detail.title": title,
  "accessNode.api": "http://localhost:8888",
  "discovery.wallet": "http://localhost:8701/fcl/authn",
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
  switch (network) {
    case "mainnet":
      config(mainnetConfig);
      break;
    case "testnet":
      config(testnetConfig);
      break;
    case "emulator":
      config(emulatorConfig);
      break;
  }

  currentNetwork = network;
};
