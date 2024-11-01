import { Injectable } from '@angular/core';

import { SoundType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  isSoundEnabled = true;
  successAudio = new Audio();
  failureAudio = new Audio();
  resultAudio = new Audio();

  constructor() {
    this.successAudio.src = 'assets/sounds/correct.mp3';
    this.failureAudio.src = 'assets/sounds/incorrect.mp3';
    this.resultAudio.src = 'assets/sounds/results.mp3';
    this.successAudio.load();
    this.failureAudio.load();
    this.resultAudio.load();
    const isSoundEnabled = localStorage.getItem('isSoundEnabled');
    if (isSoundEnabled) {
      this.isSoundEnabled = JSON.parse(isSoundEnabled);
    }
  }

  toggleSound() {
    this.isSoundEnabled = !this.isSoundEnabled;
    localStorage.setItem('isSoundEnabled', JSON.stringify(this.isSoundEnabled));
  }

  playSound(sound: SoundType) {
    if (!this.isSoundEnabled) {
      return;
    }
    switch (sound) {
      case SoundType.Correct:
        this.successAudio.play();
        break;
      case SoundType.Incorrect:
        this.failureAudio.play();
        break;
      case SoundType.Results:
        this.resultAudio.play();
        break;
    }
  }
}
