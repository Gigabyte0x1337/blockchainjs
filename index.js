const BlockChain = require("./src/blockchain");
const crypto = require('crypto');
const PreciseTimer = require('precise-timer');
const sqlite = require('sqlite');

async function start() {
    const blockChain = new BlockChain(486604799, 1);
    const genisisBlock = blockChain.createBlock([
        { test: "halods" },
        { test: "halod" },
        { test: "halos" },
        { test: "haloa" },
        { test: "halsod" },
    ]);
    genisisBlock.timestamp = 1508571924;
    genisisBlock.nonce = 466991047;
    blockChain.addBlock(genisisBlock);

    const block = blockChain.createBlock([
        { test: "halods" }
    ]);
    block.timestamp = 1508587685;
    block.nonce = 935890168;
    blockChain.addBlock(block);


    mine(block);
}
async function mine(block) {
    let hashTime = 0;
    let iterations = 0;
    while (true) {
        block.nonce = 0;
        block.timestamp = Math.round(Date.now() / 1000);
        while (block.nonce < 2147483647) {
            if (block.checkProofOfWork()) {
                console.log(block.hash.toString("hex"));
                debugger;
                break;
            }
            block.nonce++;
        }
    }
}
start();
