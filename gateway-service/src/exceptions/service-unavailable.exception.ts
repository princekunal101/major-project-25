import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceUnavailableException extends HttpException {
  constructor(serviceName: string) {
    super(`${serviceName} unavailable`, HttpStatus.SERVICE_UNAVAILABLE);
  }
}
