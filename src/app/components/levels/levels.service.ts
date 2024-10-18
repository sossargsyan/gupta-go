import { Injectable, signal } from '@angular/core';

import { levels } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private parsedLevels = levels.map((level, index) => {
    const unlocked =
      index === 0 || levels[index - 1].games.every((game) => game.completed);
    return {
      ...level,
      unlocked,
    };
  });
  private gameLevels = signal(this.parsedLevels);

  allLevels = this.gameLevels.asReadonly();
}
