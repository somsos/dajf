import { ProductServiceImpl } from '../domain/product/internal/ProductServiceImpl';
import { UserServiceImpl } from '../domain/user/internal/UserServiceImpl';

export const domainDeps = [
  { provide: 'ProductService', useClass: ProductServiceImpl },
  { provide: 'UserService', useClass: UserServiceImpl },
];
