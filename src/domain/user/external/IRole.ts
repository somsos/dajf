export abstract class IRole {
  public static readonly AdminRole = 'ROLE_users';
  public static readonly CashierRole = 'ROLE_cashier';
  public static readonly StockerRole = 'ROLE_products';

  abstract id: number;
  abstract authority: string;
}
