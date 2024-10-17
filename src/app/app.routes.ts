import { Routes } from '@angular/router';

import { routes as levelsRoutes } from './components/levels/levels.routes';
import { LevelsComponent } from './components/levels/levels.component';

export const routes: Routes = [
  {
    path: '',
    component: LevelsComponent,
  },
  {
    path: ':levelId',
    children: levelsRoutes,
  },
];
