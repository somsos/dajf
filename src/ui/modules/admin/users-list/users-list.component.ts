import { Component, inject, OnInit } from '@angular/core';
import { UserStateService } from '../../../../state/users/UsersStateService';
import { IPageDto } from '../../../../domain/common/dto/IPageDto';
import { UserModel } from '../../../../domain/user/external/UserModel';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private _state = inject(UserStateService);

  public page$ = this._state.watchUsersPage();

  public $LoadingUsers = this._state.watchUsersPageLoading();

  ngOnInit(): void {
    const pageToLoad: Partial<IPageDto<UserModel>> = {
      itemsPerPage: 10,
      pageNumber: 0,
    };
    this._state.dispatchActionLoadUsersPage(pageToLoad);
  }

  loadPage(pageNumber: number) {
    const pageToLoad: Partial<IPageDto<UserModel>> = {
      itemsPerPage: 10,
      pageNumber: pageNumber,
    };
    this._state.dispatchActionLoadUsersPage(pageToLoad);
  }
}
