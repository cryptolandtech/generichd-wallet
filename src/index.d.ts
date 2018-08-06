/// <reference types="node" />

declare class HDKey {
    static fromHDKey(hdkeyP: any, type?: string): HDKey;
    static fromMasterSeed(seedBuffer: Buffer, type?: string): HDKey;
    static fromExtendedKey(base58key: any, type?: string): HDKey;
    type: string;
    internalHdKey: any;
    privateExtendedKey(): any;
    publicExtendedKey(): any;
    derivePath(path: any): HDKey;
    deriveChild(index: any): HDKey;
    getWallet(): Wallet;
}

declare class Wallet {
    static fromPublicKey(key: Buffer, type?: string): Wallet;
    static fromPrivateKey(key: Buffer, type?: string): Wallet;
    static getUtilProvider(type?: string): any;
    loose: boolean;
    utilProvider: any;
    private privKey;
    private pubKey;
    private type;
    constructor(priv: Buffer | string, pub?: Buffer | string, type?: string);
    setUtilProvider(provider: any): void;
    getPrivateKey(): Buffer;
    getPrivateKeyString(): string;
    getPublicKey(): Buffer;
    getPublicKeyString(): string;
    getAddress(): Buffer;
    getAddressString(): string;
}

declare class Utils {
    static normalize(str: string): string;
    static isValidAddress(key: Buffer): boolean;
    static isValidPrivate(key: Buffer): boolean;
    static isValidPublic(key: Buffer): boolean;
    static publicToAddress(key: string | Buffer): Buffer;
    static privateToPublic(privateKey: string | Buffer): Buffer;
    static privateToAddress(privateKey: string | Buffer): Buffer;
    static bufferToHex: (buf: Buffer) => string;
}

export module HDKey {}
export module Wallet {}