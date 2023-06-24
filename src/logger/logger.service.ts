import { Injectable, LoggerService as CommonLoggerService } from '@nestjs/common';
import { Request } from 'express'

@Injectable()
export class LoggerService implements CommonLoggerService {
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }

  log(message: string) {
    console.log(message);
  }

  logRequest(request: Request) {
    const { method, params, query, baseUrl } = request;
    // @@ TODO: Improve logger and add private function for formatLogRequest
    this.log(`${method} ${baseUrl} - params: ${Object.values(params)}, q: ${JSON.stringify(query)}`);
  }
}