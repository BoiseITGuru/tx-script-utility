export const baseScript = `
  // This is the most basic script you can execute on Flow Network
  pub fun main():Int {
    return 42
  }
  `.slice(1); // remove new line at the bof

export const baseTransaction = `
  // This is the most basic transaction you can execute on Flow Network
  transaction() {
    prepare(signer: AuthAccount) {
      
    }
    execute {
      
    }
  }
  `.slice(1); // remove new line at the bof
