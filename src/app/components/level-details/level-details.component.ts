import { Component, input, OnInit } from '@angular/core';

import { Level } from '../../types';

@Component({
  selector: 'app-level-details',
  standalone: true,
  imports: [],
  templateUrl: './level-details.component.html',
  styleUrl: './level-details.component.scss',
})
export class LevelDetailsComponent implements OnInit {
  levelId = input.required<string>();
  levelData = input.required<Level>();

  ngOnInit(): void {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(this.levelId());
    console.log(this.levelData());
    console.log('>>>>>>>>>>>>>>>>>>>>>>>');
  }
}
