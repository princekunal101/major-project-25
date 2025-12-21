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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Status Codes
STATUS_CODES: {
            '100': 'Continue',
            '101': 'Switching Protocols',
            '102': 'Processing',
            '103': 'Early Hints',
            '200': 'OK',
            '201': 'Created',
            '202': 'Accepted',
            '203': 'Non-Authoritative Information',
            '204': 'No Content',
            '205': 'Reset Content',
            '206': 'Partial Content',
            '207': 'Multi-Status',
            '208': 'Already Reported',
            '226': 'IM Used',
            '300': 'Multiple Choices',
            '301': 'Moved Permanently',
            '302': 'Found',
            '303': 'See Other',
            '304': 'Not Modified',
            '305': 'Use Proxy',
            '307': 'Temporary Redirect',
            '308': 'Permanent Redirect',
            '400': 'Bad Request',
            '401': 'Unauthorized',
            '402': 'Payment Required',
            '403': 'Forbidden',
            '404': 'Not Found',
            '405': 'Method Not Allowed',
            '406': 'Not Acceptable',
            '407': 'Proxy Authentication Required',
            '408': 'Request Timeout',
            '409': 'Conflict',
            '410': 'Gone',
            '411': 'Length Required',
            '412': 'Precondition Failed',
            '413': 'Payload Too Large',
            '414': 'URI Too Long',
            '415': 'Unsupported Media Type',
            '416': 'Range Not Satisfiable',
            '417': 'Expectation Failed',
            '418': "I'm a Teapot",
            '421': 'Misdirected Request',
            '422': 'Unprocessable Entity',
            '423': 'Locked',
            '424': 'Failed Dependency',
            '425': 'Too Early',
            '426': 'Upgrade Required',
            '428': 'Precondition Required',
            '429': 'Too Many Requests',
            '431': 'Request Header Fields Too Large',
            '451': 'Unavailable For Legal Reasons',
            '500': 'Internal Server Error',
            '501': 'Not Implemented',
            '502': 'Bad Gateway',
            '503': 'Service Unavailable',
            '504': 'Gateway Timeout',
            '505': 'HTTP Version Not Supported',
            '506': 'Variant Also Negotiates',
            '507': 'Insufficient Storage',
            '508': 'Loop Detected',
            '509': 'Bandwidth Limit Exceeded',
            '510': 'Not Extended',
            '511': 'Network Authentication Required'
          },

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

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
