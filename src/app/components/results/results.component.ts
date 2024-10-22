import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import { LevelsService } from '../levels/levels.service';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent implements OnInit {
  private levelService = inject(LevelsService);
  data = inject(MAT_DIALOG_DATA);

  ngOnInit() {
    this.levelService.completeGame(
      this.data.levelId,
      this.data.gameId,
      this.data.correctAnswers,
      this.data.incorrectAnswers
    );
  }
}
