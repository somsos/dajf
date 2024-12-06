import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { filter, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserModel } from '../../../domain/user/external/UserModel';
import { selectLogged } from '../../../state/auth/auth.selectors';
import { clearAuthUser } from '../../../state/auth/auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectSnackBar } from '../../../state/userMessages/msgs.selectors';

@Component({
  selector: 'main-layout-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    CommonModule,
    RouterOutlet,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  auth$: Observable<UserModel | undefined>;
  private _snackBar = inject(MatSnackBar);

  isAdmin = UserModel.isAdmin;
  isStocker = UserModel.isStocker;
  isCashier = UserModel.isCashier;

  constructor(private _store: Store) {
    this.auth$ = this._store.select(selectLogged);
  }

  logout() {
    this._store.dispatch(clearAuthUser());
  }

  ngOnInit(): void {
    this._watchIfSnackMustBeShowed();
  }

  private _watchIfSnackMustBeShowed() {
    this._store
      .select(selectSnackBar)
      .pipe(filter((m) => m != null))
      .subscribe((m) => {
        this._snackBar.open(m.message, m.actionLabel, { duration: 3000 });
      });
  }
}
