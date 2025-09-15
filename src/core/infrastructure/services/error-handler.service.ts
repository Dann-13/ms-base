import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ErrorHandlerService {
  private static readonly logger = new Logger(ErrorHandlerService.name);

  static handle(error: any): never {
    this.logger.error(`Error: ${error.message}`);
    
    if (error instanceof HttpException) {
      throw error;
    }
    
    throw new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message || 'Internal server error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}