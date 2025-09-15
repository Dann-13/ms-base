import { ResponseEntity } from '../../domain/entities/response.entity';

export abstract class ResponseServicePort {
  abstract success(data: any, message?: string): ResponseEntity;
  abstract error(error: any, message?: string): ResponseEntity;
  abstract notFound(message?: string): ResponseEntity;
}