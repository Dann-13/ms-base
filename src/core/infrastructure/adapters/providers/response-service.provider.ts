import { Provider } from '@nestjs/common';
import { ResponseServicePort } from '../../../application/ports/response.service';
import { ResponseService } from '../../services/response.service';

export const ResponseServiceProvider: Provider = {
  provide: ResponseServicePort,
  useClass: ResponseService,
};