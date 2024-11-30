import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './login/page-not-found/page-not-found.component';
import { ProductListComponent } from './product/product-list/product-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductListComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'stocker',
    loadComponent: () =>
      import('./stocker-dashboard/stocker-dashboard.component').then(
        (m) => m.StockerDashboardComponent
      ),
  },
  {
    path: 'cashier',
    loadComponent: () =>
      import('./dashboard-cashier/dashboard-cashier.component').then(
        (m) => m.DashboardCashierComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./product/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'sells',
    loadChildren: () =>
      import('./sells/sells.module').then((m) => m.SellsModule),
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
