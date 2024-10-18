import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Game } from '../../types';
import { gameDuration } from '../../constants';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private interval = 0;
  gameData = input.required<Game>();
  duration = signal(gameDuration);
  isGameStarted = signal(false);

  ngOnInit() {
    this.destroyRef.onDestroy(() => {
      clearInterval(this.interval);
    });
  }

  startCountDown() {
    this.duration.set(gameDuration);
    this.isGameStarted.set(true);
    this.interval = window.setInterval(() => {
      if (this.duration() === 0) {
        this.isGameStarted.set(false);
        clearInterval(this.interval);
        return;
      }
      this.duration.set(this.duration() - 1);
    }, 1000);
  }
}
