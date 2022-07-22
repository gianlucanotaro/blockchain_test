const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }
}

class Blockchain{
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2022", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}


let blockchain = new Blockchain();
blockchain.addBlock(new Block(1, "01/01/2022", {amount: 4}));
blockchain.addBlock(new Block(2, "01/01/2022", {amount: 10}));
blockchain.addBlock(new Block(3, "01/01/2022", {amount: 20}));
blockchain.addBlock(new Block(4, "01/01/2022", {amount: 40}));
blockchain.addBlock(new Block(5, "01/01/2022", {amount: 80}));
blockchain.addBlock(new Block(6, "01/01/2022", {amount: 160}));
blockchain.addBlock(new Block(7, "01/01/2022", {amount: 320}));

console.log(JSON.stringify(blockchain, null, 4));