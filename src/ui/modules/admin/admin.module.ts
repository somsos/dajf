import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [UsersListComponent, AdminDashboardComponent],
  imports: [RouterModule, CommonModule, AdminRoutingModule],
})
export class AdminModule {}
