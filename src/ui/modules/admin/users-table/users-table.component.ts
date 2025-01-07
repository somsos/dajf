import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from '../../../../domain/user/external/UserModel';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UsersState } from '../../../../state/users/users.reducer';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  @Input()
  page!: UsersState;

  @Output()
  readonly loadPageEvent = new EventEmitter<number>();

  totalPages!: number;

  tableContent = new MatTableDataSource<UserModel>();

  displayedColumns = ['id', 'username', 'update'];

  ngOnInit(): void {
    this.tableContent.data = this.page.content;
    this.totalPages = Math.ceil(this.page.totalItems / this.page.itemsPerPage);
  }

  refresh() {
    this.loadPageEvent.emit(this.page.pageNumber);
  }

  handlePaginatorEvent(pageEvent: PageEvent) {
    this.loadPageEvent.emit(pageEvent.pageIndex);
  }

  onSelectPage(pageNumber: number) {
    this.loadPageEvent.emit(pageNumber);
  }
}
