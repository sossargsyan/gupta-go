import { Component, inject, input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { LevelsService } from '../levels/levels.service';
import { sections } from '../../constants';
import { MenuItem } from '../../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private _levelService = inject(LevelsService);
  private _router = inject(Router);
  menuList: MenuItem[] = sections;
  drawer = input.required<MatDrawer>();

  namigate(route: string) {
    this._router.navigate([route]);
    this.drawer().close();
  }

  resetProgress() {
    this._levelService.resetProgress();
    this.drawer().close();
  }
}
