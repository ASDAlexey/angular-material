import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TabOneComponent } from './tab-one/tab-one.component';
import { TabTwoComponent } from './tab-two/tab-two.component';
import { TabsComponent } from './tabs/tabs.component';

export const routes = [
  {
    path: 'tabs',
    component: TabsComponent,
    data: { shortName: 'Tabs', lessonName: 'Tabs Lesson' },
    children: [
      { path: 'tab-route-one', component: TabOneComponent },
      { path: 'tab-route-two', component: TabTwoComponent },
      { path: '', pathMatch: 'full', redirectTo: 'tab-route-one' },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TabOneComponent,
    TabTwoComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
