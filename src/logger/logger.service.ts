import { Injectable, LoggerService as CommonLoggerService } from '@nestjs/common';
import { Request, Response } from 'express'

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
    const { method, query, originalUrl } = request;
    const optionalQueryLog = `${Object.values(query).length > 0 ? `, q: ${JSON.stringify(query)}` : ''}`;
    this.log(`${method} ${originalUrl} ${optionalQueryLog}`);
  }
}