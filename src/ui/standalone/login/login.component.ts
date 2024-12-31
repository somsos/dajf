import { Component, DestroyRef, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRequest } from '../../../domain/user/external/io/LoginRequest';
import { Store } from '@ngrx/store';
import { loginRequest } from '../../../state/auth/auth.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SpinnerComponent } from '../common/spinner/spinner.component';
import { MatButtonModule } from '@angular/material/button';
import { existLoading } from '../../../state/loading/loading.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SpinnerComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public isLoginSubmitLoading: boolean = false;
  private destroyRef = inject(DestroyRef);

  readonly loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  public error?: string;

  constructor(private _store: Store) {}

  onSubmit() {
    const loginReqInfo = this._loginFormToLoginRequest();
    this._store.dispatch(loginRequest(loginReqInfo));
    this._store
      .select(existLoading('create-token'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.isLoginSubmitLoading = v;
      });
  }

  private _loginFormToLoginRequest(): LoginRequest {
    const username = this.loginForm.controls.username.value ?? '';
    const password = this.loginForm.controls.password.value ?? '';
    const user = new LoginRequest(username, password);
    return user;
  }
}
