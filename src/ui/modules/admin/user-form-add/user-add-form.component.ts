import { Component, DestroyRef, inject } from '@angular/core';
import { Location } from '@angular/common';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreActions } from '../../../commons/StoreActions';
import { UserNames } from '../../../../state/users/users.actions';
import { existLoading } from '../../../../state/loading/loading.selectors';
import { EPUsers } from '../../../../server/IUserApi';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'user-add-form',
  templateUrl: './user-add-form.component.html',
  styleUrl: './user-add-form.component.scss',
})
export class UserAddFormComponent {
  public readonly addUserReq$ = new Observable<UserModel>();

  private readonly _location = inject(Location);
  private readonly _store = inject(Store);
  private readonly _destroyedRef = inject(DestroyRef);
  //a$.pipe(takeUntilDestroyed(this._destroyedRef)).subscribe();

  readonly addingReq$ = this._store
    .select(existLoading(EPUsers))
    .pipe(takeUntilDestroyed(this._destroyedRef));

  onSubmit(toAdd: UserModel) {
    const action: StoreActions<UserModel> = {
      type: UserNames.saveUser,
      data: toAdd,
    };
    this._store.dispatch(action);
    this.addingReq$.subscribe({
      next: (loading) => {
        if (loading == false) {
          this._location.back();
        }
      },
    });
  }

  goBack() {
    this._location.back();
  }
}
