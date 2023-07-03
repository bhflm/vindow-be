import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { 
   MissingAPIKeyErrorMessage,
   InvalidAPIKeyErrorMessage
 } from '../errors/constants';

const X_API_KEY_HEADER = 'x-api-key';
const SECRET_API_KEY_VALIDATION = 'VindowTravel';

@Injectable()
export class ValidateAPIKey implements NestMiddleware {
   private isValidAPIKey(key: string) {
      // Real world scenario validation for this should be enhanced properly
      return key.includes(SECRET_API_KEY_VALIDATION);
   };

   use(req: Request, _res: Response, next: NextFunction) {
      const { headers } = req;
      const APIKey = headers[X_API_KEY_HEADER] as string;


      if (!APIKey) {
         throw new HttpException(MissingAPIKeyErrorMessage, HttpStatus.UNAUTHORIZED);
      }

      if (!this.isValidAPIKey(APIKey)) {
         throw new HttpException(InvalidAPIKeyErrorMessage, HttpStatus.UNAUTHORIZED);
      }

      next();
   }
}