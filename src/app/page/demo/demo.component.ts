import { Component, OnInit } from '@angular/core';
import { Observable, of, observable, Subscriber } from 'rxjs';
import { listenToElementOutputs } from '@angular/core/src/view/element';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  source$ = of(1, 2, 3);
  constructor() { }

  ngOnInit() {
    console.log(this.source$.subscribe(console.log));
    console.log('-----------------');
    console.log(this.create());
    console.log('-----------------');
    console.log(this.completeTest());
    console.log('-----------------');
    console.log(this.unSubscribe());
  }

  // 创建observable,err
  create() {
    const onSubscribe = observer => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.error('something wrong');
      observer.complete();
    };
    const source$ = new Observable(onSubscribe);
    const theObserver = {
      next: item => console.log(item),
      error: err => console.log(err),
      complete: () => console.log('end'),
    };
    source$.subscribe(theObserver);
  }

  // observable的间隔,observable的完结,err处理
  completeTest() {
    const onSubscribe = observer => {
      let num = 1;
      const handle = setInterval(() => {
        observer.next(num++);
        if (num > 3) {
          clearInterval(handle);
          observer.complete();
        }
      }, 1000);
    };
    const source$ = new Observable(onSubscribe);
    const theObserver = {
      next: item => console.log(item),
      complete: () => console.log('end'),
    };
    source$.subscribe(theObserver);
  }

  // simple
  simpleObservable() {
    const onSubscribe = observer => {
      let num = 1;
      const handle = setInterval(() => {
        observer.next(num++);
        if (num > 3) {
          clearInterval(handle);
          observer.complete();
        }
      }, 1000);
    };
    const source$ = new Observable(onSubscribe);
    source$.subscribe(
      item => console.log(item),
      err => console.log(err),
      () => console.log('end'),
    );
    source$.subscribe(
      item => console.log(item),
      null,
      () => console.log('end'),
    );
  }
  // 退订
  unSubscribe() {
    const onSubscribe = observer => {
      let num = 1;
      const handle = setInterval(() => {
        console.log('in onSubscribe', num);
        observer.next(num++);
      }, 1000);
      return {
        unsubscribe: () => {
          clearInterval(handle);
        }
      };
    };
    const source$ = new Observable(onSubscribe);
    const subscription = source$.subscribe(item => console.log(item));
    setTimeout(() => {
      subscription.unsubscribe();
    }, 3500);
  }

  // hot Observable
  coldObservable() {
    const cold$ = new Observable(observable => {
      // const producer = new Producer();
    });
  }

  hotObservable() {
    // const
  }

}
