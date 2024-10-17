import { Component, inject, input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Level } from '../../types';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-level-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, TitleCasePipe],
  templateUrl: './level-details.component.html',
  styleUrl: './level-details.component.scss',
})
export class LevelDetailsComponent {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _us = inject(UtilsService);
  levelData = input.required<Level>();

  getOperationIcon(operationName: string): string {
    return this._us.getOperationIcon(operationName);
  }

  openGame(gameId: string) {
    this._router.navigate([gameId], { relativeTo: this._route });
  }
}
