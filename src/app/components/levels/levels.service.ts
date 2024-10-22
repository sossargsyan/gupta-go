import { Injectable, signal } from '@angular/core';

import { mockLevels } from '../../constants';
import { Level } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LevelsService {
  private initialLevels: Level[] = JSON.parse(JSON.stringify(mockLevels));
  private gameLevels = signal(this.initialLevels);
  allLevels = this.gameLevels.asReadonly();

  constructor() {
    let startingLevels: Level[] = [];
    const storageLevels = localStorage.getItem('levels');
    if (storageLevels) {
      startingLevels = JSON.parse(storageLevels) as Level[];
    } else {
      startingLevels = [...this.initialLevels];
    }
    startingLevels[0].unlocked = true;
    this.gameLevels.set(startingLevels);
  }

  private saveLevels() {
    localStorage.setItem('levels', JSON.stringify(this.gameLevels()));
  }

  completeGame(
    levelId: string,
    gameId: string,
    correctAnswers: number,
    incorrectAnswers: number
  ) {
    this.gameLevels.update((prevLevels) => {
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
    const clonnedLevels = JSON.parse(JSON.stringify(mockLevels));
    clonnedLevels[0].unlocked = true;
    this.gameLevels.set(clonnedLevels);
    this.saveLevels();
  }
}
