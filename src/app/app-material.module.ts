import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule } from '@angular/material';

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
}
