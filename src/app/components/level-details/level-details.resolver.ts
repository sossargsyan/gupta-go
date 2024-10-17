import { ResolveFn, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { Level } from '../../types';

export const levelDetailsResolver: ResolveFn<Level | UrlTree> = (
  activatedRouteSnapshot,
  routerState
) => {
  const levelsService = inject(LevelsService);
  const router = inject(Router);
  const levelId = activatedRouteSnapshot.paramMap.get('levelId');
  const level = levelsService.allLevels().find((level) => level.id === levelId);
  if (level) {
    return level;
  } else {
    // Redirect to a 'not-found' page if the level is not found
    return router.parseUrl('/not-found');
  }
};
