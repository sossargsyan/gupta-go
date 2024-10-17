import { Routes } from '@angular/router';

import { levelDetailsResolver } from '../level-details/level-details.resolver';
import { LevelDetailsComponent } from '../level-details/level-details.component';
import { GameComponent } from '../game/game.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full',
  },
  {
    path: 'games',
    component: LevelDetailsComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      levelData: levelDetailsResolver,
    },
  },
  {
    path: 'games/:id',
    component: GameComponent,
  },
];
