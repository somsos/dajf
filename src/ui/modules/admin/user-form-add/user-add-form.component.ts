import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { filter, first, Observable, of, tap } from 'rxjs';
import { UserStateService } from '../../../../state/users/UsersStateService';
import { IRequestDto } from '../../../../state/requests/IRequestDto';

@Component({
  selector: 'user-update-form',
  templateUrl: './user-add-form.component.html',
  styleUrl: './user-add-form.component.scss',
})
export class UserAddFormComponent {
  private readonly _location = inject(Location);
  private readonly _usersState = inject(UserStateService);

  addingReq$: Observable<IRequestDto<unknown>> = of({
    id: 'a1b',
    status: 'unstarted',
  });

  onSubmit(toAdd: UserModel) {
    this.addingReq$ = this._usersState.dispatchRequestActionAddUser(toAdd);
    this.addingReq$
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
    this._location.back();
  }
}
