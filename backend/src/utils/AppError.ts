import { ERROR_CODE, ERROR_NAME } from "../config/error.config";

export class AppError extends Error {
     public name: string;
     public statusCode: number;
     public error?: any;
     public success: boolean;

     constructor (message: string, statusCode: keyof typeof ERROR_CODE, error?: any) {
          super(message);
          this.success = false;
          this.error = error;
          this.statusCode = ERROR_CODE[statusCode];
          this.name = ERROR_NAME[statusCode];
          Object.setPrototypeOf(this, new.target.prototype);
     }
}