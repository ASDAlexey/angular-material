import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatIconRegistry, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
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
  ],
  declarations: []
})
export class AppMaterialModule {
  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'podcast',
      sanitizer.bypassSecurityTrustResourceUrl('assets/podcast.svg')
    );
  }
}
