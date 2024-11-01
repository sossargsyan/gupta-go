import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { SoundService } from '../../services/sound.service';
import { Operations, SoundType } from '../../types';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private _router = inject(Router);
  private _levelService = inject(LevelsService);
  private _soundService = inject(SoundService);
  data = inject(MAT_DIALOG_DATA);
  starsCount = 5;
  displayedColumns: string[] = ['question', 'selectedAnswer', 'correctAnswer'];

  ngOnInit() {
    this._soundService.playSound(SoundType.Results);
    this._levelService.completeGame(
      this.data.levelId,
      this.data.gameId,
      this.data.correctAnswers,
      this.data.incorrectAnswers
    );
  }

  get starsArray() {
    return new Array(this.starsCount);
  }

  calculatePercentage() {
    const total = this.data.correctAnswers + this.data.incorrectAnswers;
    return Math.round((this.data.correctAnswers / total) * 100);
  }

  detectStarColor(index: number) {
    const percentage = this.calculatePercentage();
    const total = this.data.correctAnswers + this.data.incorrectAnswers;
    const answersTreshold = 10;
    if (total < answersTreshold) {
      return '';
    }
    const starPercentage = 100 / this.starsCount;
    const starIndex = Math.floor(percentage / starPercentage);
    if (index < starIndex) {
      return 'gupta-go-orange';
    }
    return '';
  }

  goToNextGame() {
    let url = '/';
    switch (this.data.gameId) {
      case Operations.Addition:
        url = `${this.data.levelId}/games/${Operations.Subtraction}`;
        break;
      case Operations.Subtraction:
        url = `${this.data.levelId}/games/${Operations.Multiplication}`;
        break;
      case Operations.Multiplication:
        url = `${this.data.levelId}/games/${Operations.Division}`;
        break;
      default:
        break;
    }
    this._router.navigate([url]);
  }
}
