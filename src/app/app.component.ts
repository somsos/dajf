import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { domainDeps } from './app.domainDeps';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserModel } from '../domain/user/external/UserModel';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLogged } from '../state/auth/auth.selectors';

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
  providers: [...domainDeps],
})
export class AppComponent {
  auth$: Observable<UserModel | undefined>;

  constructor(private store: Store) {
    this.auth$ = this.store.select(selectLogged);
  }
}
