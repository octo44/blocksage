require('dotenv').config();
const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const axios = require('axios');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'blocksage.log' })
  ],
});

class BlockSage {
    constructor(providerUrl) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
    }

    async getTokenMetrics(tokenAddress) {
        const decimals = await this.web3.eth.call({
            to: tokenAddress,
            data: this.web3.eth.abi.encodeFunctionSignature('decimals()')
        }).then(data => this.web3.utils.hexToNumber(data));

        const totalSupply = await this.web3.eth.call({
            to: tokenAddress,
            data: this.web3.eth.abi.encodeFunctionSignature('totalSupply()')
        }).then(data => new BigNumber(this.web3.utils.hexToNumberString(data)).dividedBy(new BigNumber(10).pow(decimals)).toString());

        return { decimals, totalSupply };
    }

    async getWalletTokenBalance(walletAddress, tokenAddress) {
        const balanceOfData = this.web3.eth.abi.encodeFunctionCall({
            name: 'balanceOf',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'account'
            }]
        }, [walletAddress]);

        const balance = await this.web3.eth.call({
            to: tokenAddress,
            data: balanceOfData
        }).then(data => new BigNumber(this.web3.utils.hexToNumberString(data)).toString());

        return balance;
    }

    // Example of using axios to fetch external data (e.g., current ETH price)
    async fetchCurrentEthPrice() {
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            return response.data.ethereum.usd;
        } catch (error) {
            logger.error('Failed to fetch ETH price', error);
            throw error;
        }
    }
}

module.exports = BlockSage;
