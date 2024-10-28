import { Routes } from '@angular/router';

import { routes as levelsRoutes } from './components/levels/levels.routes';
import { LevelsComponent } from './components/levels/levels.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: LevelsComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: ':levelId',
    children: levelsRoutes,
  },
];
