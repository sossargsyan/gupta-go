import {
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { Answer, Game } from '../../types';
import { gameDuration } from '../../constants';
import { GameService } from './game.service';
import { ResultsComponent } from '../results/results.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);
  private _gameService = inject(GameService);
  private _interval = 0;
  gameData = input.required<Game>();
  duration = signal(gameDuration);
  isGameStarted = signal(false);
  timerClasses = computed(() => ({
    'aritrain-orange': this.duration() < 20,
    'aritrain-red': this.duration() < 10,
  }));
  correctAnswers = signal(0);
  incorrectAnswers = signal(0);
  questionString = signal<string>('');
  answers = signal<Answer[]>([]);

  ngOnInit() {
    this._destroyRef.onDestroy(() => {
      clearInterval(this._interval);
    });
  }

  generateQuestion() {
    const { id, min, max } = this.gameData();
    const question = this._gameService.generateRandomOperation(id, min, max);
    this.questionString.set(question.question);
    this.answers.set(question.answers);
  }

  openDialog() {
    const currentTheme = localStorage.getItem('theme');
    this._dialog.open(ResultsComponent, {
      panelClass: currentTheme as string,
      width: '560px',
      height: '400px',
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '400ms',
      disableClose: true,
      data: {
        levelId: this.gameData().levelId,
        gameId: this.gameData().id,
        correctAnswers: this.correctAnswers(),
        incorrectAnswers: this.incorrectAnswers(),
      },
    });
  }

  resetGame() {
    this.correctAnswers.set(0);
    this.incorrectAnswers.set(0);
    this.duration.set(gameDuration);
  }

  startCountDown() {
    this.generateQuestion();
    this.resetGame();
    this.isGameStarted.set(true);
    this._interval = window.setInterval(() => {
      if (this.duration() === 0) {
        this.isGameStarted.set(false);
        this.openDialog();
        clearInterval(this._interval);
        return;
      }
      this.duration.set(this.duration() - 1);
    }, 1000);
  }

  selectAnswer(answer: Answer) {
    if (answer.isCorrect) {
      this.correctAnswers.set(this.correctAnswers() + 1);
    } else {
      this.incorrectAnswers.set(this.incorrectAnswers() + 1);
    }
    this.generateQuestion();
  }
}
