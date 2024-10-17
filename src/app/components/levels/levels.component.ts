import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute, Router } from '@angular/router';

import { LevelsService } from './levels.service';

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
})
export class LevelsComponent {
  private _ls = inject(LevelsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  levels = this._ls.allLevels();

  openLevel(id: string) {
    this._router.navigate([id], { relativeTo: this._route });
  }
}
