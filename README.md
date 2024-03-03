# BlockSage

BlockSage is a Web3 intelligence tool designed to enhance your blockchain data analysis. It utilizes several key dependencies to provide precise token metrics, secure environment management, external data fetching, and extensive logging capabilities.

## Features

- Token Metrics: Fetch and calculate token decimals and total supply.
- Wallet Token Balance: Retrieve the balance of a specific token for any wallet.
- Current ETH Price: Fetch the current Ethereum price from external APIs.
- Extensive Logging: Keep track of operations and errors through detailed logs.

## Installation

npm install blocksage

## Usage
First, ensure you have a .env file with your Web3 provider URL:

WEB3_PROVIDER_URL=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

Then, you can use BlockSage as follows:

const BlockSage = require('blocksage');
const sage = new BlockSage(process.env.WEB3_PROVIDER_URL);

// Fetch token metrics
async function getTokenMetrics() {
    const metrics = await sage.getTokenMetrics('<TOKEN_ADDRESS>');
    console.log(metrics);
}

// Get wallet token balance
async function getWalletTokenBalance() {
    const balance = await sage.getWalletTokenBalance('<WALLET_ADDRESS>', '<TOKEN_ADDRESS>');
    console.log(balance);
}

// Fetch current ETH price
async function getCurrentEthPrice() {
    const price = await sage.fetchCurrentEthPrice();
    console.log(price);
}

getTokenMetrics();
getWalletTokenBalance();
getCurrentEthPrice();