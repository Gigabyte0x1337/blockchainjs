const BlockChain = require("./src/blockchain");
const crypto = require('crypto');

const blockChain = new BlockChain(486604799, 1);
const genesisBlock = blockChain.createBlock([
    { test: "halods" },
    { test: "halod" },
    { test: "halos" },
    { test: "haloa" },
    { test: "halsod" },
]);
genesisBlock.timestamp = 1508571924;
genesisBlock.nonce = 466991047;
blockChain.addBlock(genesisBlock);

const block = blockChain.createBlock([
    { test: "halods" }
]);
//block.timestamp = 1508587685;
//block.nonce = 935890168;
//blockChain.addBlock(block);
const maxInt32 = 2147483647;
function mine(block) {
    while (true) {
        block.nonce = 0;
        block.timestamp = Math.round(Date.now() / 1000);
        while (block.nonce < maxInt32) {
            if (block.checkProofOfWork()) {
                console.log(block.hash.toString("hex"));
                debugger;
                break;
            }
            block.nonce++;
        }
    }
}
mine(block);
