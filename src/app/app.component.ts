import { Component, OnDestroy, OnInit } from '@angular/core';
import { concat, fromEvent, interval, Observable, of, Subject } from 'rxjs';
import { ignoreElements, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ErrorStateMatcher, MatIconRegistry } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

export const SCOLL_CONTAINER = '.mat-dawer-content';
export const PIMARY_TEXT_THRESHOLD = 22;
export const PIMARY_SHADOW_THRESHOLD = 78;

export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1 })),
      transition('* => void', [
        animate(`.5s ease-out`, style({ opacity: 0 }))
      ])
    ])
  ],
  styleUrls: ['./app.component.scss'],
  providers: [CustomErrorStateMatcher],
})
export class AppComponent implements OnInit, OnDestroy {
  popText: boolean;
  applyShadow: boolean;
  subsctiption = new Subject();
  customErrorStateMatcher = new CustomErrorStateMatcher();
  loadingPercent$: Observable<number>;
  queryValue = 0;
  currentPlayback = 0;
  queryMode = 'indeterminate';

  ngOnInit() {
    fromEvent(document, 'scroll').pipe(takeUntil(this.subsctiption)).subscribe(() => this.determineHeader(window.pageYOffset));

    this.loadingPercent$ = this.loadingPogress(500);
    this.loadingPogress(250).subscribe((i) => (this.currentPlayback = i));

    concat(
      interval(2000).pipe(
        take(1),
        tap(_ => this.queryMode = 'determinate'),
        ignoreElements(),
      ),
      this.loadingPogress(500),
    ).subscribe((t) => this.queryValue = t);
  }

  loadingPogress(speed: number) {
    return interval(speed).pipe(
      map(i => i * 10),
      takeWhile(i => i <= 100)
    );
  }

  determineHeader(top: number) {
    console.log(top);
    this.popText = top >= PIMARY_TEXT_THRESHOLD;
    this.applyShadow = top >= PIMARY_SHADOW_THRESHOLD;
  }

  ngOnDestroy() {
    this.subsctiption.next();
    this.subsctiption.complete();
  }
}
