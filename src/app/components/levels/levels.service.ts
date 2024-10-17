import { Injectable, signal } from '@angular/core';

import { levels } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private gameLevels = signal(levels);

  allLevels = this.gameLevels.asReadonly();
}
