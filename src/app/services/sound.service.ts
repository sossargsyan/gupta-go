import { Injectable } from '@angular/core';

import { SoundType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  isSoundEnabled = true;

  constructor() {
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
    const audio = new Audio();
    audio.src = `assets/sounds/${sound}.mp3`;
    audio.load();
    audio.play();
  }
}
