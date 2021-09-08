# Tormentum API
[![CircleCI](https://circleci.com/gh/TheTwoCoders/tormentum-api/tree/main.svg?style=svg)](https://circleci.com/gh/TheTwoCoders/tormentum-api/tree/main)

This is the API for Tormentum app.

## How to Run?

### Initial Setup

To set environment variables and to be able to run the project, you must run first:

```bash
$ yarn setup
```

This will run `scripts/setup.sh` script and set `.env` file.

### Running Tests

You first need Docker and Docker Compose setted up.

Before running the tests you need MongoDB running:

```bash
$ docker compose up -d mongo
```

Now you can run the tests with:

```bash
$ yarn test
```
