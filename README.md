# wallets-api

## Run the app locally
`npm install`

`npm run start:dev`

## Env variables

Example
```
API_URL=https://api.etherscan.io/api
API_KEY=<ETHERSCAN_API_KEY>

DB_TYPE=sqlite
DB_NAME=db.sqlite

CORS_CLIENTS=http://localhost:3000

USD_EUR_RATE=0.9149
```

## Database
Run migrations
`npm run typeorm migration:run`

**sqlite database already included and preloaded**

## API local port
`3001`

## Client Application
[Client](https://github.com/German969/wallet-client)