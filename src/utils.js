module.exports = class Utils {
    static bitsToInt(bits) {
        const num = new Buffer.alloc(4);
        num.writeInt32BE(bits);
        const exp = num.readInt8(0);
        const mult = num.readIntBE(1, 3);
        return mult * (2 ** (8 * (exp - 3)));
    }
}