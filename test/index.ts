import { assert } from "chai";
import mocha from "mocha";
import Wallet from "../src/wallet";

const fixturePrivateKey: string = '3c44987879fa78f7523558179e6c9a52ece396044c6d5137be08d2c54e2af55d';
const fixturePrivateKeyStr: string = fixturePrivateKey.toUpperCase();
const fixturePrivateKeyBuffer: Buffer = Buffer.from(fixturePrivateKey, 'hex');

const fixturePublicKey: string = '02caf1938242e1c9d6aa77b41847bdfce2c140991ac1871e41391b1e3227469d11';
const fixturePublicKeyStr: string = fixturePublicKey.toUpperCase();
const fixturePublicKeyBuffer: Buffer = Buffer.from(fixturePublicKey, 'hex');

const WalletType: string = "ZIL";

const fixtureWallet = Wallet.fromPrivateKey(fixturePrivateKeyBuffer, WalletType);

describe('Wallet class', () => {

    describe('.getPrivateKey()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getPrivateKey().toString('hex'), fixturePrivateKey);
        });
        it('should fail', () => {
            assert.throws(() => {
                Wallet.fromPrivateKey(Buffer.from('001122', 'hex'));
            }, /^Error: Private key does not satisfy the curve requirements \(ie. it is invalid\)$/);
        });
    });

    describe('.getPrivateKeyString()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getPrivateKeyString(), fixturePrivateKeyStr);
        });
    });

    describe('.getPublicKey()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getPublicKey().toString('hex'), fixturePublicKey);
        });
    });

    describe('.getPublicKeyString()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getPublicKeyString(), fixturePublicKeyStr);
        });
    });

    describe('.getAddress()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getAddress().toString('hex'), 'bffb05370b9b00ade22e43f74461d3019c80e2a0');
        });
    });

    describe('.getAddressString()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getAddressString(), 'BFFB05370B9B00ADE22E43F74461D3019C80E2A0');
        });
    });

    describe('public key only wallet', () => {
        const pubKey = Buffer.from(fixturePublicKey, 'hex');
        it('.fromPublicKey() should work', () => {
            assert.equal(Wallet.fromPublicKey(pubKey, WalletType).getPublicKey().toString('hex'), fixturePublicKey);
        });

        it('.fromPublicKey() should not accept keys that are not valid', () => {
            assert.throws(() => {
                Wallet.fromPublicKey(Buffer.from('BFFB05370B9B00ADE22E43F74461D3019C80E2A0', 'hex'), WalletType);
            }, /^Error: Invalid public key$/);
        });

        it('.getAddress() should work', () => {
            assert.equal(Wallet.fromPublicKey(pubKey, WalletType).getAddress().toString("hex"), 'bffb05370b9b00ade22e43f74461d3019c80e2a0');
        });

        it('.getAddressString() should work', () => {
            assert.equal(Wallet.fromPublicKey(pubKey, WalletType).getAddressString(), 'BFFB05370B9B00ADE22E43F74461D3019C80E2A0');
        });

        it('.getPrivateKey() should fail', () => {
            assert.throws(() => {
                Wallet.fromPublicKey(pubKey, WalletType).getPrivateKey();
            }, /^Error: This is a public key only wallet$/);
        });
    });

    describe('raw new Wallet() init', () => {
        it('should fail when both priv and pub key provided', () => {
            assert.throws(() => {
                const test = new Wallet(fixturePrivateKeyBuffer, fixturePublicKeyBuffer); // eslint-disable-line
            }, /^Error: Cannot supply both a private and a public key to the constructor$/);
        });
    });

    /*

    Right now zilliqa is using uppercase addresses. Will try to ask them about it, maybe checksum addresses are wanted.

    describe('.getChecksumAddressString()', () => {
        it('should work', () => {
            assert.equal(fixtureWallet.getChecksumAddressString(), 'B14Ab53E38DA1C172f877DBC6d65e4a1B0474C3c')
        })
    })
    */
});
