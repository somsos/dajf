import { mergeMap, of, tap } from 'rxjs';

describe('set', () => {
  it('Hi1', () => {
    of(1)
      .pipe(
        tap({
          next: (x) => {
            console.log('tap', x);
          },
        }),
        mergeMap((y) => {
          console.log('merge', y);
          return of(2);
        })
      )
      .subscribe({
        next: (z) => {
          console.log('subscription', z);
        },
      });
  });
});
