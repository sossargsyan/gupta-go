import { Component, input, OnInit } from '@angular/core';

import { Game } from '../../types';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  gameData = input.required<Game>();

  ngOnInit() {
    console.log(this.gameData());
  }
}
