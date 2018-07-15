import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_LABEL_GLOBAL_OPTIONS,
  MatButtonModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatListModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

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
  ],
  declarations: [],
  providers: [
    // { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'always' } }
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
