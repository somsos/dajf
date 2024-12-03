import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { UserModel } from '../domain/user/external/UserModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLogged } from '../state/auth/auth.selectors';
import { clearAuthUser } from '../state/auth/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth$: Observable<UserModel | undefined>;

  isAdmin = UserModel.isAdmin;
  isStocker = UserModel.isStocker;
  isCashier = UserModel.isCashier;

  constructor(private _store: Store) {
    this.auth$ = this._store.select(selectLogged);
  }

  logout() {
    this._store.dispatch(clearAuthUser());
  }
}
