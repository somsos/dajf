import { AppEntity } from './IEntity';

export class IPageDto<E extends AppEntity> {
  constructor(
    public readonly content: E[],
    public readonly itemsPerPage: number,
    public readonly pageNumber: number,
    public readonly totalItems: number
  ) {}

  sortByOldestFist() {
    this.content.sort((a, b) => a.createAt.getTime() - b.createAt.getTime());
  }
}
