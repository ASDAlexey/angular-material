import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const SCOLL_CONTAINER = '.mat-dawer-content';
export const PIMARY_TEXT_THRESHOLD = 22;
export const PIMARY_SHADOW_THRESHOLD = 78;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  popText: boolean;
  applyShadow: boolean;
  subsctiption = new Subject();

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
