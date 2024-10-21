import { ResolveFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { Game, LevelType } from '../../types';

export const gameResolver: ResolveFn<Game | UrlTree> = (
  activatedRouteSnapshot,
  routerState
) => {
  const levelsService = inject(LevelsService);
  const router = inject(Router);
  const levelId = activatedRouteSnapshot.paramMap.get('levelId') as LevelType;
  const level = levelsService.allLevels().find((level) => level.id === levelId);
  const gameId = activatedRouteSnapshot.paramMap.get('gameId');
  const game = level?.games.find((game) => game.id === gameId);
  if (game) {
    game.levelId = levelId;
    return game;
  } else {
    // Redirect to a 'not-found' page if the level is not found
    return router.parseUrl('/not-found');
  }
};
