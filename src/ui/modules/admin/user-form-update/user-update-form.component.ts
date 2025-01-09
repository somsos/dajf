import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { filter, first, Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../../commons/StoreActions';
import { UserNames } from '../../../../state/users/users.actions';
import { existLoading } from '../../../../state/loading/loading.selectors';
import { EPUsers } from '../../../../server/IUserApi';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

  actionStatus$: Observable<IRequestDto<unknown>> = of({
    id: 'EcJAxKoSk',
    status: 'unstarted',
  });

  ngOnInit(): void {
    this._findUserByPathId();
  }

  private _findUserByPathId() {
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = StringUtils.stringToNumberOtThrow(params.get('id'));
      this._userState.selectUserById(id).subscribe((found) => {
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

  goBack() {
    this._router.navigateByUrl('/admin/users');
  }
}
