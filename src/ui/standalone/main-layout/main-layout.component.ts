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
import { selectSnackBar } from '../../../state/userMessages/msgs.selectors';
import { NotificationService } from '../../commons/NotificationService';

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
  providers: [NotificationService],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent implements OnInit {
  auth$: Observable<UserModel | undefined>;
  private readonly _notificationSrv = inject(NotificationService);

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
        this._notificationSrv.showSnackBar(m.message, m.actionLabel);
      });
  }
}
