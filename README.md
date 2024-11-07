# tb

## Prerequisites

- [Install TigerBeetle](https://docs.tigerbeetle.com/quick-start/)

## Setup

### Create TigerBeetle data file

```sh
./tigerbeetle format --cluster=0 --replica=0 --replica-count=1 --development 0_0.tigerbeetle
```

### Install dependencies

```sh
npm i
```

## Run

### Start TigerBeetle cluster

```sh
./tigerbeetle start --addresses=3000 --development 0_0.tigerbeetle
```

### Start client application

```sh
npm start
```

NOTE: Read the official docs for more information about the [TigerBeetle Node.js client](https://docs.tigerbeetle.com/clients/node/).

### Optional: Connect to TigerBeetle REPL

```sh
./tigerbeetle repl --cluster=0 --addresses=3000
```
