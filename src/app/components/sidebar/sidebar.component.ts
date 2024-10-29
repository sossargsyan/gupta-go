import { Component, inject, input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { SoundService } from '../../services/sound.service';
import { sections } from '../../constants';
import { MenuItem } from '../../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSlideToggleModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private _levelService = inject(LevelsService);
  private _soundService = inject(SoundService);
  private _router = inject(Router);
  menuList: MenuItem[] = sections;
  drawer = input.required<MatDrawer>();

  get isSoundEnabled() {
    return this._soundService.isSoundEnabled;
  }

  toggleSound() {
    this._soundService.toggleSound();
  }

  namigate(route: string) {
    this._router.navigate([route]);
    this.drawer().close();
  }

  resetProgress() {
    this._levelService.resetProgress();
    this.drawer().close();
  }
}
