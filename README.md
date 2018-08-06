# generichd-wallet

Typescript - Generic HD Wallet, inspired by ethereumjs-wallet with sigutil replacement

## Usage

```
import * as GenericWallet from "generichd-wallet";

const HDKey = GenericWallet.HDKey;

const Wallet = GenericWallet.Wallet;
```

## Wallet API

Constructors:

* `fromPrivateKey(input, [type])` - create an instance based on a raw private key
* `fromExtendedPrivateKey(input, [type])` - create an instance based on a BIP32 extended private key (xprv)
* `fromPublicKey(input, [type])` - create an instance based on a public key (certain methods will not be available)

Note: `type` is the coin symbol required to determine which sigutil to load. Supported at the moment *ETH* / *ZIL*. 

`type` Defaults to *ETH*

Instance methods:

* `getPrivateKey()` - return the private key
* `getPublicKey()` - return the public key
* `getAddress()` - return the address

All of the above instance methods return a Buffer. Use the `String` suffixed versions for a string output, such as `getPrivateKeyString()`.

## HD Wallet API

To use BIP32 HD wallets, first include the `hdkey` submodule:

```
import * as GenericWallet from "generichd-wallet";

const HDKey = GenericWallet.HDKey;
```


Constructors:

* `fromMasterSeed(seed, [type])` - create an instance based on a seed
* `fromExtendedKey(key, [type])` - create an instance based on a BIP32 extended private or public key

Note: `type` is the coin symbol required to determine which sigutil to load. Supported at the moment *ETH* / *ZIL*. 

`type` Defaults to *ETH*

For the seed  we suggest to use [bip39](https://npmjs.org/package/bip39) to create one from a BIP39 mnemonic.

Instance methods:

* `privateExtendedKey()` - return a BIP32 extended private key (xprv)
* `publicExtendedKey()` - return a BIP32 extended public key (xpub)
* `derivePath(path)` - derive a node based on a path (e.g.  m/44'/0'/0/1)
* `deriveChild(index)` - derive a node based on a child index
* `getWallet()` - return a `Wallet` instance as seen above


## License

MIT License

Inspired by ethereumjs-wallet by Alex Beregszaszi

Copyright (C) 2018: cryptoland.tech

Author: Micky Socaci
