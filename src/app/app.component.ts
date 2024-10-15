import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ThemeType } from './types';
import { JsonReaderService } from './services/json-reader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostBinding('class')
  currentTheme: ThemeType =
    (localStorage.getItem('theme') as ThemeType) || ThemeType.Dark;
  isDarkMode: boolean = this.currentTheme === ThemeType.Dark;
  appVersion!: string;

  constructor(private _jsonReaderService: JsonReaderService) {}

  ngOnInit(): void {
    this._jsonReaderService.getAppVersion().subscribe((version) => {
      this.appVersion = version;
    });
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      localStorage.setItem('theme', ThemeType.Dark);
      this.currentTheme = ThemeType.Dark;
    } else {
      localStorage.setItem('theme', ThemeType.Light);
      this.currentTheme = ThemeType.Light;
    }
  }
}
