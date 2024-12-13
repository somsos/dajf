import { IMessage } from '../../../state/userMessages/dto/UserMessage';
import { ErrorDto } from '../../commons/ErrorDto';

export const updateErr1: IMessage = {
  message: 'ningún cambio detectado',
  actionLabel: 'Ok',
};

export const unexpected = (cause: string): ErrorDto => {
  const msg = 'Error inesperado';
  return new ErrorDto(msg, cause);
};
