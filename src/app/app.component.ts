import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorStateMatcher, MatIconRegistry } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

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
  styleUrls: ['./app.component.scss'],
  providers: [CustomErrorStateMatcher],
})
export class AppComponent implements OnInit, OnDestroy {
  popText: boolean;
  applyShadow: boolean;
  subsctiption = new Subject();
  customErrorStateMatcher = new CustomErrorStateMatcher();

  ngOnInit() {
    fromEvent(document, 'scroll').pipe(takeUntil(this.subsctiption)).subscribe(() => this.determineHeader(window.pageYOffset));
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
