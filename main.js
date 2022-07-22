const {Blockchain, Transactions} = require('./src/blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.genKeyPair('f114bacab582dd33d2d80b0b6b9b5dfed6fbcbdc6389cb8cc80e49c09cfebe46');
const myWalletAddress = myKey.getPublic('hex');

let blockchain = new Blockchain();

const tx1 = new Transactions(myWalletAddress, 'public key', 5);
tx1.signTransaction(myKey);
blockchain.addTransaction(tx1);

console.log("\nStarting the miner...");
blockchain.minePendingTransactions(myWalletAddress);

console.log("\nBalance of blockchain-miner-address is: " + blockchain.getBalanceOfAddress(myWalletAddress));
