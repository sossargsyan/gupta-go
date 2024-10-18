export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export enum Operations {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
}

export interface Game {
  id: Operations;
  min: number;
  max: number;
  completed?: boolean;
}

export interface Level {
  id: string;
  name: string;
  title: string;
  games: Game[];
}

export interface OperationConfig {
  text: string;
  color: string;
}
