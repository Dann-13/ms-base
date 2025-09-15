export class ResponseEntity {
  statusCode: number;
  statusType: string;
  message: string;
  data?: any;
  error?: any;
}