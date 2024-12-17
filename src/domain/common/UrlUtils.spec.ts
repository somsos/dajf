import { UrlUtils } from './UrlUtils';

describe('UrlUtils', () => {
  beforeEach(async () => {});

  const shouldPass = [
    { a: '/products/12', b: '/products/1' },
    { a: '/products/123455', b: '/products/1' },
    { a: '/users/123', b: '/users/1' },
    { a: '/users/2', b: '/users/1' },
    { a: '/users/2/images', b: '/users/1/images' },
    { a: '/users/623/images', b: '/users/1/images' },
    { a: '/users/323456/images', b: '/users/1/images' },
  ];

  shouldPass.forEach((url) => {
    it(`should return ${url.b}`, () => {
      const hasParams = UrlUtils.reduceParams(url.a);
      expect(hasParams).toBe(url.b);
    });
  });

  const shouldNotPass = [
    { a: '/products', b: '/products' },
    { a: '/products/a', b: '/products/a' },
    { a: '/users', b: '/users' },
    { a: '/users/', b: '/users/' },
    { a: '/users?search=a/3', b: '/users?search=a/3' },
    { a: '/users/images?name=aa', b: '/users/images?name=aa' },
  ];

  shouldNotPass.forEach((url) => {
    it(`should return false in (${url})`, () => {
      const hasParams = UrlUtils.reduceParams(url.a);
      expect(hasParams).toBe(url.b);
    });
  });
});
