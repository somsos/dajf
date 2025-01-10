import { Component, inject, OnInit } from '@angular/core';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { filter, first, Observable, of, tap } from 'rxjs';
import { UserStateService } from '../../../../state/users/UsersStateService';
import { ActivatedRoute, Router } from '@angular/router';
import { StringUtils } from '../../../../domain/common/StringUtils';
import { ErrorDto } from '../../../commons/ErrorDto';
import { IRequestDto } from '../../../../state/requests/IRequestDto';

@Component({
  selector: 'user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrl: './user-update-form.component.scss',
})
export class UserUpdateFormComponent implements OnInit {
  readonly addUserReq$ = new Observable<UserModel>();

  userFound!: UserModel;

  private readonly _router = inject(Router);
  private readonly _userState = inject(UserStateService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private idUser = -1;

  actionStatus$: Observable<IRequestDto<unknown>> = of({
    id: 'EcJAxKoSk',
    status: 'unstarted',
  });

  deleteReq$: Observable<IRequestDto<unknown>> = of({
    id: 'jHr3nhSohQz',
    status: 'unstarted',
  });

  ngOnInit(): void {
    this._findUserByPathId();
  }

  private _findUserByPathId() {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.idUser = StringUtils.stringToNumberOtThrow(params.get('id'));
      this._userState.selectUserById(this.idUser).subscribe((found) => {
        if (!found) {
          throw new ErrorDto(
            'Usuario no encontrado',
            'find user by id not found'
          );
        }
        this.userFound = found;
      });
    });
  }

  onSubmit(toUpdate: UserModel) {
    toUpdate.id = this.userFound.id;
    this.actionStatus$ =
      this._userState.dispatchRequestActionUpdateUser(toUpdate);
    this.actionStatus$
      .pipe(
        filter((s) => s.status == 'success'),
        first()
      )
      .subscribe({
        complete: () => {
          this.goBack();
        },
      });
  }

  goBack(): void {
    this._router.navigateByUrl('/admin/users');
  }

  onDelete(e: Event) {
    e.preventDefault();
    this.deleteReq$ = this._userState.dispatchRequestActionDeleteById(
      this.idUser
    );
    this.deleteReq$
      .pipe(
        filter((s) => s.status == 'success'),
        first()
      )
      .subscribe({ complete: () => this.goBack() });
  }
}
