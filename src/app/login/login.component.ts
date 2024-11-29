import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUserService } from '../../domain/user/external/IUserService';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorUtils } from '../../domain/common/ErrorUtils';
import { UserModel } from '../../domain/user/external/UserModel';
import { LoginRequest } from '../../domain/user/external/io/LoginRequest';
import { ERole } from '../../domain/user/external/ERole';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);

  readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public error?: string;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    @Inject('UserService') private _srv: IUserService
  ) {}

  onSubmit() {
    const loginReqInfo = this._loginFormToLoginRequest();
    this._srv
      .login(loginReqInfo)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (d) => {
          this._handleLoginSuccess(d);
        },
        error: (e) => {
          this._handleLoginError(e);
        },
      });
  }

  private _handleLoginSuccess(userAuth: UserModel) {
    if (userAuth.roles.includes(ERole.Admin)) {
      this._router.navigateByUrl('/admin');
    } else if (userAuth.roles.includes(ERole.Stocker)) {
      this._router.navigateByUrl('/stocker');
    } else if (userAuth.roles.includes(ERole.Cashier)) {
      this._router.navigateByUrl('/cashier');
    }
  }

  private _handleLoginError(e: any) {
    this.error = ErrorUtils.objToString(e);
    this._cdr.detectChanges();
  }

  private _loginFormToLoginRequest(): LoginRequest {
    const username = this.loginForm.controls.username.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';
    const user = new LoginRequest(username, password);
    return user;
  }
}
