import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';
import { IRole } from '../../../../domain/user/external/IRole';
import { ErrorDto } from '../../../commons/ErrorDto';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(16),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.max(26),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(16),
    ]),
    passwordRepeat: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.max(16),
    ]),
  });

  roles = [
    { id: 1, authority: 'admin_users', checked: false },
    { id: 2, authority: 'admin_products', checked: false },
    { id: 3, authority: 'admin_sells', checked: false },
  ];

  @Input()
  type!: string;

  @Input()
  actionReq$!: Observable<boolean>;

  @Input()
  readReq$: Observable<UserModel> | undefined;

  @Output()
  readonly onSubmitEvent = new EventEmitter<UserModel>();

  userOnForm?: UserModel;

  btnSubmitLabel = 'Agregar';

  ngOnInit(): void {
    this._setupForm();
    /*
    this.rolesToShow.forEach((r) => {
      this.userForm.controls.roles.push(new FormControl(''));
    });
    console.log(
      'this.userForm.controls.roles',
      this.userForm.controls.roles.controls
    );
    */
  }

  private _setupForm() {
    console.debug('form product type', this.type);
    switch (this.type) {
      case 'add':
        this._setAddForm();
        break;

      case 'details':
        //this._setDetailsForm();
        break;

      case 'update':
        //this._setUpdateForm();
        break;

      default:
        break;
    }
  }

  private _setAddForm(): void {
    const newUser: UserModel = {
      id: 0,
      password: undefined,
      roles: [],
      username: '',
      email: '',
      createAt: new Date(),
    };
    this.userOnForm = newUser;
    this._fillForm();
  }

  private _fillForm(): void {
    if (!this.userOnForm) {
      console.warn('user to full form empty');
      return;
    }

    this.userForm.setValue({
      username: this.userOnForm.username,
      email: this.userOnForm.email,
      password: this.userOnForm.password ?? null,
      passwordRepeat: '',
    });
  }

  private _extractUserOnForm(): void {
    const username = this.userForm.controls.username.value ?? '';
    const email = this.userForm.controls.email.value ?? '';
    const password = this.userForm.controls.password.value ?? '';
    const roles = this.roles
      .filter((r) => r.checked)
      .map((rForm) => ({ id: rForm.id, authority: rForm.authority } as IRole));

    const user: UserModel = {
      username: username,
      email: email,
      roles: roles,
      password: password,
      id: 0,
      createAt: new Date(),
    };

    this.userOnForm = user;
  }

  onSubmit(): void {
    if (this.userForm.valid == false) {
      return;
    }

    this._extractUserOnForm();
    const passRepeated = this.userForm.controls.passwordRepeat.value ?? '';
    if (passRepeated != this.userOnForm?.password) {
      throw new ErrorDto(
        'Contraseñas no coinciden',
        'matching passwords required to continue'
      );
    }
    this.onSubmitEvent.emit(this.userOnForm);
  }

  onSelectRole($event: MatSelectChange) {
    console.log('onSelectRole, $event', $event);
  }

  update(completed: boolean, index: number) {
    const selectedTask = this.roles[index];
    selectedTask.checked = completed;
  }
}
