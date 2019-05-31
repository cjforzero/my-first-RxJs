import { Observable, of, observable, Subscriber } from 'rxjs';
import { Source } from '_@types_webpack-sources@0.1.5@@types/webpack-sources';

function map(project) {
  return new Observable(function (observer) {
    const sub = this.subscribe({
      next: value => {
        try {
          observer.next(project(value));
        } catch (err) {
          observer.error(err);
        }
      },
      error: err => observer.error(err),
      complete: () => observer.complete(),
    });
    return {
      unsubscribe: () => {
        sub.unsubscribe();
      }
    };
  });
}
// Observable.prototype.map = map;

const source$ = new Observable();
const result$ = map.bind(source$)(x => x * 2);
const result1$ = map.call(source$, x => x * 2);

function map1(project) {
  return this.lift(function (source$) {
    const sub = source$.subscribe({
      next: value => {
        try {
          this.next(project(value));
        } catch (err) {
          this.error(err);
        }
      },
      error: err => this.error(err),
      complete: () => this.complete(),
    });
    return {
      unsubscribe: () => {
        sub.unsubscribe();
      }
    };
  });
}

// Observable.prototype.map1 = map1;

function map2(project) {
  return function (obs$) {
    return new Observable(obeserver => {
      return obs$.subcribe({
        newst: value => obeserver.next(project(value)),
        error: err => obeserver.error(err),
        complete: () => obeserver.complete(),
      });
    });
  };
}

const map3 = fn => obs$ => new Observable(obeserver => {
  obs$.subcribe({
    newst: value => obeserver.next(fn(value)),
    error: err => obeserver.error(err),
    complete: () => obeserver.complete(),
  });
});

const sor$ = of(1, 2, 3);
const doub$ = obs$ => obs$.map(x => x * 2);
// const res = sor$.let(doub$);
result$.subscribe(console.log);
