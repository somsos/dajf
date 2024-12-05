import { ProductServiceImpl } from '../../domain/product/internal/ProductServiceImpl';
import { UserServiceImpl } from '../../domain/user/internal/UserServiceImpl';
import { AuthApiImpl } from '../../server/impl/AuthApiImpl';

export const domainDeps = [
  { provide: 'ProductService', useClass: ProductServiceImpl },
  { provide: 'UserService', useClass: UserServiceImpl },
  { provide: 'authApi', useClass: AuthApiImpl },
];
