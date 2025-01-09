import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAddFormComponent } from './user-form-add/user-add-form.component';
import { UserUpdateFormComponent } from './user-form-update/user-update-form.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'users', component: UsersListComponent },
  { path: 'users/add', component: UserAddFormComponent },
  //{ path: 'details/:id', component: UserAddFormComponent },
  { path: 'users/update/:id', component: UserUpdateFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
