import { UserServiceImpl } from '../../domain/user/internal/UserServiceImpl';
import { environment } from '../../environment/environment';
import { AuthApiImpl } from '../../server/impl/AuthApiImpl';
import { AuthApiMock } from '../../server/mock4testing/AuthApiMock';

const dataSource = environment.mockData ? AuthApiMock : AuthApiImpl;

export const domainDeps = [
  { provide: 'UserService', useClass: UserServiceImpl },
  { provide: 'authApi', useClass: dataSource },
];
