import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule, MatDatepickerModule, MatDialogModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatSortModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { PlatformModule } from '@angular/cdk/platform';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PlatformModule,
    MatMomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  declarations: [],
  providers: [
    // { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }
    // providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]
  ],
})
export class AppMaterialModule {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'podcast',
      sanitizer.bypassSecurityTrustResourceUrl('assets/podcast.svg')
    );
  }
}
