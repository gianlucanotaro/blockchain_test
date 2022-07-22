const {Blockchain, Transactions} = require('./blockchain');
const SHA256 = require('crypto-js/sha256');

class Transactions{
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}


let blockchain = new Blockchain();
blockchain.createTransaction(new Transactions("address1", "address2", 100));
blockchain.createTransaction(new Transactions("address2", "address1", 50));

console.log("\nStarting the miner...");
blockchain.minePendingTransactions("blockchain-miner-address");

console.log('\n Restarting the miner...');
blockchain.minePendingTransactions("blockchain-miner-address");

console.log("\nBalance of blockchain-miner-address is: " + blockchain.getBalanceOfAddress("blockchain-miner-address"));
