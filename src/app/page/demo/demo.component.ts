import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  }
}
