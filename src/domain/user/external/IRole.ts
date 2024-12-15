export abstract class IRole {
  public static readonly AdminRole = 'ROLE_admin_users';
  public static readonly CashierRole = 'ROLE_admin_products';
  public static readonly StockerRole = 'ROLE_admin_sells';

  abstract id: number;
  abstract authority: string;
}
