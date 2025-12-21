import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export class AxiosForwardException extends HttpException {
  constructor(error: unknown, serviceName = 'Downstream Service') {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Downstream service with status code (e.g. 400, 422)
        super(error.response.data, error.response.status);
      } else {
        // No response at all (e.g. ECONNREFUSED, timeout)
        super(`${serviceName} unavilable`, HttpStatus.SERVICE_UNAVAILABLE);
      }
    } else {
      // Not an axios error
      super('Unexpected Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
