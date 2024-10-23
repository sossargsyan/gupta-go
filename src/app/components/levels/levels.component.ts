import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { LevelsService } from './levels.service';
import { Level } from '../../types';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [MatRippleModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
})
export class LevelsComponent {
  private _levelService = inject(LevelsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  get allLevels() {
    return this._levelService.allLevels();
  }

  openLevel(level: Level) {
    if (level.unlocked) {
      this._router.navigate([level.id], { relativeTo: this._route });
    }
  }
}
