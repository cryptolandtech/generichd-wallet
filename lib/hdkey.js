"use strict";
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/hdkey.js
Object.defineProperty(exports, "__esModule", { value: true });
const reqhdkey = require("hdkey");
const index_1 = require("./index");
class HDKey {
    constructor() {
        this.type = "ETH";
    }
    static fromHDKey(hdkeyP, type) {
        const ret = new HDKey();
        if (type) {
            ret.type = type;
        }
        ret.internalHdKey = hdkeyP;
        return ret;
    }
    static fromMasterSeed(seedBuffer, type) {
        return HDKey.fromHDKey(reqhdkey.fromMasterSeed(seedBuffer), type);
    }
    static fromExtendedKey(base58key, type) {
        return HDKey.fromHDKey(reqhdkey.fromExtendedKey(base58key), type);
    }
    privateExtendedKey() {
        if (!this.internalHdKey.privateExtendedKey) {
            throw new Error("Error: This is a public key only wallet");
        }
        return this.internalHdKey.privateExtendedKey;
    }
    publicExtendedKey() {
        return this.internalHdKey.publicExtendedKey;
    }
    derivePath(path) {
        return HDKey.fromHDKey(this.internalHdKey.derive(path), this.type);
    }
    deriveChild(index) {
        return HDKey.fromHDKey(this.internalHdKey.deriveChild(index), this.type);
    }
    getWallet() {
        if (this.internalHdKey._privateKey) {
            return index_1.default.fromPrivateKey(this.internalHdKey._privateKey, this.type);
        }
        else {
            return index_1.default.fromPublicKey(this.internalHdKey._publicKey, this.type);
        }
    }
}
exports.default = HDKey;
