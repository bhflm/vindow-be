import { Injectable, NestMiddleware, BadRequestException, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

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
         throw new BadRequestException(`'${X_API_KEY_HEADER}' is missing`);
      }

      if (!this.isValidAPIKey(APIKey)) {
         // @@TODO: Refactor errors module
         throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      next();
   }
}