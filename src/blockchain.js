const crypto = require('crypto');
const merkle = require('merkle');
const Block = require('./block');

module.exports = class BlockChain {
    constructor(bits, version) {
        this.bits = bits;
        this.version = version;
        this.chain = [];
    }

    getLastBlockHash() {
        if (this.chain.length == 0) {
            return crypto.createHash('sha256').update("0").digest();
        }else {
            return this.chain[this.chain.length - 1].hash;
        }
    }

    createBlock(transactions) {
        const hashPrevBlock = this.getLastBlockHash();
        const hashMerkleRoot = new Buffer(merkle('sha256').sync(transactions).root(), "hex");
        const timestamp = Math.round(Date.now() / 1000);
        return new Block(this.version, timestamp, hashPrevBlock, hashMerkleRoot, this.bits, transactions);
    }

    addBlock(block) {
        if (block.isValid()) {
            this.chain.push(block);
        }
    }
}
