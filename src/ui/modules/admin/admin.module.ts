import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersApiMock } from '../../../server/mock4testing/UsersApiMock';
import { usersApiName } from '../../../server/IUserApi';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from '../../../state/users/users..effects';
import { UsersTableComponent } from './users-table/users-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SpinnerComponent } from '../../standalone/common/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserAddFormComponent } from './user-form-add/user-add-form.component';
import { UserStateService } from '../../../state/users/UsersStateService';

@NgModule({
  declarations: [
    UsersListComponent,
    AdminDashboardComponent,
    UsersTableComponent,
    UserFormComponent,
    UserAddFormComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    SpinnerComponent,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  providers: [
    { provide: usersApiName, useClass: UsersApiMock },
    UserStateService,
    provideEffects(UsersEffects),
  ],
})
export class AdminModule {}
