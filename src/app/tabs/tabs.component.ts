import { Component, OnInit } from '@angular/core';
// import { routes } from '../app.module';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  // tabRoutes = routes.filter(r => r.path === 'tabs')
  //                   .map(({ children }) => children)
  //                   .reduce((acc, curr) => [...acc, ...curr], [])
  //                   .filter(({ path }) => !!path);

  constructor() {
  }

  ngOnInit() {
  }

}
