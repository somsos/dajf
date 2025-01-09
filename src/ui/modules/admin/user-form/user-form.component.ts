import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IRole } from '../../../../domain/user/external/IRole';
import { ErrorDto } from '../../../commons/ErrorDto';
import { IRequestDto } from '../../../../state/requests/IRequestDto';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  private readonly _formBuilder = inject(FormBuilder);

  readonly userForm: FormGroup = this._formBuilder.group({
    username: [
      null,
      [Validators.required, Validators.min(3), Validators.max(16)],
    ],
    email: [null, [Validators.required, Validators.min(3), Validators.max(16)]],
    password: [
      null,
      [Validators.required, Validators.min(3), Validators.max(16)],
    ],
    passwordRepeat: [
      null,
      [Validators.required, Validators.min(3), Validators.max(16)],
    ],
  });

  roles = [
    { id: 1, authority: 'admin_users', checked: false },
    { id: 2, authority: 'admin_products', checked: false },
    { id: 3, authority: 'admin_sells', checked: false },
  ];

  @Input()
  type!: string;

  @Input()
  actionReq$!: Observable<IRequestDto<unknown>>;

  @Input()
  readReq$: Observable<UserModel> | undefined;

  @Output()
  readonly onSubmitEvent = new EventEmitter<UserModel>();

  @Input()
  userOnForm?: UserModel;

  btnSubmitLabel = 'Agregar';

  ngOnInit(): void {
    this._setupForm();
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
        this._setUpdateForm();
        break;

      default:
        break;
    }
  }

  private _setUpdateForm(): void {
    this.btnSubmitLabel = 'Actualizar';

    if (!this.userOnForm) {
      throw new ErrorDto(
        'Error inesperado',
        'this.userOnForm required for update form'
      );
    }
    this._fillForm();
    this._removeUpdateNotRequiredFields();
  }

  private _removeUpdateNotRequiredFields() {
    this.userForm.removeControl('password');
    this.userForm.removeControl('passwordRepeat');
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

    this.userOnForm.roles.forEach((fromUser) => {
      this.roles.forEach((fromAll) => {
        if (fromUser.authority === fromAll.authority) {
          fromAll.checked = true;
        }
      });
    });
  }

  private _extractUserOnForm(): void {
    const username = this.userForm.controls['username'].value ?? '';
    const email = this.userForm.controls['email'].value ?? '';
    const password = this.userForm.controls['password']?.value ?? '';
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
    this._comparePasswords();
    this.onSubmitEvent.emit(this.userOnForm);
  }

  private _comparePasswords(): void {
    if (this.type == 'update') {
      return;
    }
    const passRepeated = this.userForm.controls['passwordRepeat'].value ?? '';
    if (passRepeated != this.userOnForm?.password) {
      throw new ErrorDto(
        'Contraseñas no coinciden',
        'matching passwords required to continue'
      );
    }
  }

  update(completed: boolean, index: number) {
    const selectedTask = this.roles[index];
    selectedTask.checked = completed;
  }
}
