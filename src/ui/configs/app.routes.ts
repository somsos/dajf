import { Routes } from '@angular/router';
import { LoginComponent } from '../standalone/login/login.component';
import { PageNotFoundComponent } from '../standalone/login/page-not-found/page-not-found.component';
import { adminGuard, cashierGuard, stockerGuard } from './guards/guards.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('../modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'stocker',
    canActivate: [stockerGuard],
    loadComponent: () =>
      import(
        '../standalone/dashboard-stocker/dashboard-stocker.component'
      ).then((m) => m.DashboardStockerComponent),
  },
  {
    path: 'cashier',
    canActivate: [cashierGuard],
    loadComponent: () =>
      import(
        '../standalone/dashboard-cashier/dashboard-cashier.component'
      ).then((m) => m.DashboardCashierComponent),
  },
  {
    path: 'products',
    canActivate: [stockerGuard],
    loadChildren: () =>
      import('../modules/product/product.module').then((m) => m.productModule),
  },
  {
    path: 'sells',
    canActivate: [cashierGuard],
    loadChildren: () =>
      import('../modules/sells/sells.module').then((m) => m.SellsModule),
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
