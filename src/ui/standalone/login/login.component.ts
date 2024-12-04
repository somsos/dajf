import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../domain/user/external/io/LoginRequest';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../../state/auth/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public error?: string;

  constructor(private _store: Store) {}

  onSubmit() {
    const loginReqInfo = this._loginFormToLoginRequest();
    this._store.dispatch(loginRequest(loginReqInfo));
  }

  private _loginFormToLoginRequest(): LoginRequest {
    const username = this.loginForm.controls.username.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';
    const user = new LoginRequest(username, password);
    return user;
  }
}
