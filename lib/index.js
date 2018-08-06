"use strict";
// inspired by https://github.com/ethereumjs/ethereumjs-wallet/blob/master/index.js
Object.defineProperty(exports, "__esModule", { value: true });
const Buffer = require('safe-buffer').Buffer;
const ethUtil = require('ethereumjs-util');
const zilliqa_1 = require("./sigutil/zilliqa");
class Wallet {
    constructor(priv, pub, type) {
        this.loose = false;
        this.type = "ETH";
        if (priv && pub) {
            throw new Error("Error: Cannot supply both a private and a public key to the constructor");
        }
        if (type) {
            this.type = type;
        }
        this.utilProvider = Wallet.getUtilProvider(this.type);
        if (priv && !this.utilProvider.isValidPrivate(priv)) {
            throw new Error("Error: Private key does not satisfy the curve requirements \(ie. it is invalid\)");
        }
        if (pub && !this.utilProvider.isValidPublic(pub)) {
            throw new Error("Error: Invalid public key");
        }
        if (priv && typeof (priv) !== "string") {
            this.privKey = priv;
        }
        else {
            this.privKey = new Buffer("");
        }
        if (pub && typeof (pub) !== "string") {
            this.pubKey = pub;
        }
        else {
            this.pubKey = new Buffer("");
        }
    }
    static fromPublicKey(key, type) {
        return new Wallet("", key, type);
    }
    static fromPrivateKey(key, type) {
        return new Wallet(key, "", type);
    }
    static getUtilProvider(type) {
        let provider = ethUtil;
        if (type === "ZIL") {
            provider = zilliqa_1.default;
        }
        return provider;
    }
    setUtilProvider(provider) {
        this.utilProvider = provider;
    }
    getPrivateKey() {
        const keyString = this.utilProvider.bufferToHex(this.privKey);
        if (keyString === "" || keyString === "0x") {
            throw new Error("Error: This is a public key only wallet");
        }
        return this.privKey;
    }
    getPrivateKeyString() {
        return this.utilProvider.bufferToHex(this.getPrivateKey());
    }
    getPublicKey() {
        const keyString = this.utilProvider.bufferToHex(this.pubKey);
        if (keyString === "" || keyString === "0x") {
            this.pubKey = this.utilProvider.privateToPublic(this.privKey);
        }
        return this.pubKey;
    }
    getPublicKeyString() {
        return this.utilProvider.bufferToHex(this.getPublicKey());
    }
    getAddress() {
        return this.utilProvider.publicToAddress(this.getPublicKey());
    }
    getAddressString() {
        return this.utilProvider.bufferToHex(this.getAddress());
    }
}
exports.default = Wallet;
