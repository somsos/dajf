import { ErrorDto } from '../../ui/commons/ErrorDto';

export interface IRequestDto<P> {
  id: string;
  status: 'unstarted' | 'loading' | 'success' | 'failed';
  response?: P;
  error?: ErrorDto;
}
