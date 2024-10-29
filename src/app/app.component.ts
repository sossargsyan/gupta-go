import {
  Component,
  computed,
  HostBinding,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { ThemeType } from './types';
import { homeRoute } from './constants';
import { UtilsService } from './services/utils.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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
    SidebarComponent,
    MatBadgeModule,
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
  currentRoute = signal(homeRoute);
  isHomeRoute = computed(() => this.currentRoute() === homeRoute);
  private _utilsService = inject(UtilsService);
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  ngOnInit(): void {
    this._utilsService.getAppVersion().subscribe((version) => {
      this.appVersion = version;
    });
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.url);
      }
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

  goBack() {
    const currentUrl = this._router.url;
    const urlSegments = currentUrl.split('/');
    if (urlSegments.length < 4) {
      this._router.navigate(['../'], { relativeTo: this._route });
      return;
    }
    urlSegments.pop();
    const parentUrl = urlSegments.join('/').trim();
    this._router.navigate([parentUrl]);
  }
}
