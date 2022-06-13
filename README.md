# multi-chain-token-supply

## Quick Start

node version
v14.19.0

Install typescript globally

```bash
npm install typescript -g
```

Install pm2 globally

```bash
npm install pm2 -g
```

Install the dependencies:

```bash
npm install
```

## Note: configuration TokenContractAddresses and Networks

open config.ts and add your TokenContractAddresses in CONTRACTS_INFO
additionaly you can also change application port number

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run build
```

```bash
npm run start
```

## Endpoints

/v1/tokenSupply/{yourTokenName}/networks/all
