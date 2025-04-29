<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Notes
For this application did not had enough time to implement some features that I would have like to do in an application, since I took to much time adding some nice to have. 
Listed bellow:

### TODO
- Unit Test (I would have been supported with google gemini)
- Integration Tests (same as unit test)
- Load Tests (Using K6 and adding it to the pipeline)
- husky (Implemented on ses-sns app)
- Improve Docker support. Possible multi env support
- CI/CD pipelines with AWS Code Build
- Add logger https://docs.nestjs.com/techniques/logger (But manage to integrate to Sentry)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project implements a NestJS application designed to extract and parse structured data from emails. The application provides REST API endpoints that process emails containing JSON or CSV data.

### Usage Example

Extract JSON from an email (URL source)
```bash
curl -X POST https://mail-parser.juanramirez.dev/v1/email-processor/json \
  -H "Content-Type: application/json" \
  -d '{"source": "https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/email-with-attachment.eml"}'

```
Process CSV from an email (local file)
```bash
curl -X POST https://mail-parser.juanramirez.dev/v1/email-processor/csv \
  -H "Content-Type: application/json" \
  -d '{"source": "/path/to/local/email.eml"}'
```

### Example URLs for JSON Processing

The application supports several scenarios for extracting JSON data from emails:

#### Case A: JSON as a file attachment
Process an email with a JSON file attachment:
```
https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/email-with-attachment.eml
```

#### Case B: JSON inside the body of the email as a link
Process an email containing a direct link to a JSON resource:
```
https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/email-with-link-to-json.eml
```

#### Case C: JSON inside the body of the email as a recursive link
Process an email with a link to a webpage that contains another link to the actual JSON:
```
https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/email-with-link-to-site-with-json.eml
```

### Case D: Email with not Json
```
https://test-parser-juanramirez.s3.us-east-1.amazonaws.com/no-json-email.eml
```

Key features include:
- **Swagger Documentation:** Integrates Swagger for easy API exploration and testing.
- **Security:** Uses `helmet` for basic security hardening.
- **Health Check:** Provides a `/health` endpoint for monitoring application status.
- **Request Timeout:** Implements a `TimeoutInterceptor` (see `src/common/interceptors/timeout.interceptor.ts`) on the email processor endpoint to prevent potential infinite loops during recursive URL fetching for JSON data.

## Origin

This project has been forked from [JuanROrellana/ses-sns-event](https://github.com/JuanROrellana/ses-sns-event).

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running with Docker

Build the Docker image:

```bash
$ docker build -t mail-parser .
```

Run the application locally using Docker Compose:

```bash
$ docker compose up -d
```

Access the application at `http://localhost:3000/api`.