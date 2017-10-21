const crypto = require('crypto');
const merkle = require('merkle');
const Utils = require('./utils');

module.exports = class Block {

    constructor(version, timestamp, hashPrevBlock, hashMerkleRoot, bits, transactions) {
        this.version = version;
        this.timestamp = timestamp;
        this.hashPrevBlock = hashPrevBlock;
        this.hashMerkleRoot = hashMerkleRoot;
        this.bits = bits;
        this.transactions = transactions;
    }

    getHeader() {
        let buffer = Buffer.alloc(4)
        buffer.writeInt32LE(this.version, 0);
        buffer = Buffer.concat([
            buffer,
            this.reverseBuffer(this.hashPrevBlock),
            this.reverseBuffer(this.hashMerkleRoot)
        ], 4 + 32 + 32 + 4 + 4 + 4);
        buffer.writeInt32LE(this.timestamp, 4 + 32 + 32);
        buffer.writeInt32LE(this.bits, 4 + 32 + 32 + 4);
        buffer.writeInt32LE(this.nonce, 4 + 32 + 32 + 4 + 4);
        return buffer;
    }
    /**
     * 
     * @param {Buffer} buffer 
     */
    reverseBuffer(buffer) {
        const buff = Buffer.alloc(buffer.byteLength);
        buffer.forEach((b, i) => {
            buff.fill(b, (buffer.byteLength - 1) - i, (buffer.byteLength - 1) - i + 1);
        });
        return buff;
    }
    isValid() {
        return this.checkProofOfWork() && this.checkMerkleRoot();
    }
    get hash() {
        const header = this.getHeader();
        const headerHash = crypto.createHash('sha256').update(header).digest();
        return crypto.createHash('sha256').update(headerHash).digest();
    }
    checkMerkleRoot() {
        return new Buffer(merkle('sha256').sync(this.transactions).root(), "hex").equals(this.hashMerkleRoot);
    }
    checkProofOfWork() {
        const blockHash = this.hash;
        const hash = blockHash.readUIntBE(0, blockHash.byteLength);
        const target = Utils.bitsToInt(this.bits);
        return hash <= target;
    }
}

