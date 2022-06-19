export const fetchRegistry = async () => {
  // TODO: THis should point back to an updatable backend
  const url = `/flow.json`;
  const response = await fetch(url);
  return response.json();
};

const NOT_FOUND = "NOT FOUND";
export const prepareEnvironments = (json) => {
  const { contracts } = json;
  const test = [];
  const main = [];
  for (const name in contracts) {
    const { aliases } = contracts[name];
    const { testnet = NOT_FOUND, mainnet = NOT_FOUND } = aliases;
    test.push([name, testnet]);
    main.push([name, mainnet]);
  }

  const gather = (acc, contract) => {
    const [name, address] = contract;
    acc[name] = address;
    return acc;
  };

  return {
    testnet: test.reduce(gather, {}),
    mainnet: main.reduce(gather, {}),
  };
};

export const debounce = (func, wait = 500) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
