import * as moment from 'moment';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, fromEvent, interval, Observable, of, Subject } from 'rxjs';
import { filter, ignoreElements, map, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { ErrorStateMatcher, MatDialog, MatIconRegistry, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DialogComponent } from './dialog/dialog.component';
import { Platform } from '@angular/cdk/platform';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';

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
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  popText: boolean;
  applyShadow: boolean;
  subsctiption = new Subject();
  customErrorStateMatcher = new CustomErrorStateMatcher();
  loadingPercent$: Observable<number>;
  queryValue = 0;
  currentPlayback = 0;
  queryMode = 'indeterminate';
  startDate = moment([2017, 10, 1]);
  minDate = moment([2017, 9, 1]);
  maxDate = moment([2017, 11, 24]);
  dataSource = new MatTableDataSource([
    { id: 1, name: 'Alexey' },
    { id: 2, name: 'Alexey 2' },
    { id: 3, name: 'Alexey 3' },
    { id: 3, name: 'Alexey 3' },
    { id: 3, name: 'Alexey 3' },
    { id: 3, name: 'Alexey 3' },
    { id: 3, name: 'Alexey 3' },
    { id: 3, name: 'Alexey 3' },
    { id: 9, name: 'Alexey 9' },
  ]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private platform: Platform, private snackBar: MatSnackBar) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get isTouchDevice() {
    return this.platform.ANDROID || this.platform.IOS;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, { data: 'email' });
    dialogRef.afterClosed().pipe(
      filter(r => !!r),
    ).subscribe(console.log);
  }

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

  openSnackbar() {
    // const snackbar = this.snackBar.open('Hello world!!!', 'Close', {
    //   duration: 3000,
    //   verticalPosition: 'top',
    // });

    const snackbar = this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: 'message',
      duration: 3000,
      verticalPosition: 'top',
    });

    snackbar.afterDismissed().subscribe(() => {
      console.log('afterDismissed');
    });

    snackbar.onAction().subscribe(() => {
      console.log('onAction');
    });
  }

  loadingPogress(speed: number) {
    return interval(speed).pipe(
      map(i => i * 10),
      takeWhile(i => i <= 100)
    );
  }

  determineHeader(top: number) {
    this.popText = top >= PIMARY_TEXT_THRESHOLD;
    this.applyShadow = top >= PIMARY_SHADOW_THRESHOLD;
  }

  ngOnDestroy() {
    this.subsctiption.next();
    this.subsctiption.complete();
  }
}
