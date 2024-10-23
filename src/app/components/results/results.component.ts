import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { Operations } from '../../types';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private _router = inject(Router);
  private _levelService = inject(LevelsService);
  data = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    this._levelService.completeGame(
      this.data.levelId,
      this.data.gameId,
      this.data.correctAnswers,
      this.data.incorrectAnswers
    );
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
