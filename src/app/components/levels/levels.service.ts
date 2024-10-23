import { Injectable, signal } from '@angular/core';

import { initialLevels } from '../../constants';
import { Level } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private _initialLevels: Level[] = JSON.parse(JSON.stringify(initialLevels));
  private _gameLevels = signal(this._initialLevels);
  allLevels = this._gameLevels.asReadonly();

  constructor() {
    let startingLevels: Level[] = JSON.parse(JSON.stringify(initialLevels));
    const storageLevels = localStorage.getItem('levels');
    if (storageLevels) {
      startingLevels = JSON.parse(storageLevels) as Level[];
    }
    startingLevels[0].unlocked = true;
    this._gameLevels.set(startingLevels);
  }

  private saveLevels() {
    localStorage.setItem('levels', JSON.stringify(this._gameLevels()));
  }

  completeGame(
    levelId: string,
    gameId: string,
    correctAnswers: number,
    incorrectAnswers: number
  ) {
    this._gameLevels.update((prevLevels) => {
      const updatedLevels = [...prevLevels];
      const levelIndex = updatedLevels.findIndex(
        (level) => level.id === levelId
      );
      const gameIndex = updatedLevels[levelIndex].games.findIndex(
        (game) => game.id === gameId
      );
      updatedLevels[levelIndex].games[gameIndex].completed = true;
      updatedLevels[levelIndex].games[gameIndex].correctAnswers =
        correctAnswers;
      updatedLevels[levelIndex].games[gameIndex].incorrectAnswers =
        incorrectAnswers;
      if (gameIndex === updatedLevels[levelIndex].games.length - 1) {
        const nextLevel = updatedLevels[levelIndex + 1];
        if (nextLevel) {
          updatedLevels[levelIndex].unlocked = true;
          updatedLevels[levelIndex + 1].unlocked = true;
        }
      }
      return updatedLevels;
    });
    this.saveLevels();
  }

  resetProgress() {
    const clonnedLevels = JSON.parse(JSON.stringify(initialLevels));
    clonnedLevels[0].unlocked = true;
    this._gameLevels.set(clonnedLevels);
    this.saveLevels();
  }
}
