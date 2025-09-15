import { Injectable } from '@nestjs/common';
import { ResponseServicePort } from '../../application/ports/response.service';
import { ResponseEntity } from '../../domain/entities/response.entity';
import { HttpStatusCodeEnum } from '../../domain/enums/http-status-code.enum';
import { HttpStatusTypeEnum } from '../../domain/enums/http-status-type.enum';

@Injectable()
export class ResponseService implements ResponseServicePort {
  success(data: any, message = 'Operation successful'): ResponseEntity {
    return {
      statusCode: HttpStatusCodeEnum.OK,
      statusType: HttpStatusTypeEnum.SUCCESS,
      message,
      data,
    };
  }

  error(error: any, message = 'Operation failed'): ResponseEntity {
    return {
      statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR,
      statusType: HttpStatusTypeEnum.ERROR,
      message,
      error,
    };
  }

  notFound(message = 'Resource not found'): ResponseEntity {
    return {
      statusCode: HttpStatusCodeEnum.NOT_FOUND,
      statusType: HttpStatusTypeEnum.ERROR,
      message,
    };
  }
}