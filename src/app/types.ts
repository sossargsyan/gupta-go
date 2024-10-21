export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export enum LevelType {
  SingleDigit = 'single-digit-numbers',
  TwoDigit = 'two-digit-numbers',
  ThreeDigit = 'three-digit-numbers',
}

export enum Operations {
  Addition = 'addition',
  Subtraction = 'subtraction',
  Multiplication = 'multiplication',
  Division = 'division',
}

export interface Game {
  id: Operations;
  levelId?: LevelType;
  min: number;
  max: number;
  completed?: boolean;
}

export interface Level {
  id: LevelType;
  name: string;
  title: string;
  games: Game[];
  unlocked?: boolean;
}

export interface OperationConfig {
  text: string;
  color: string;
}
export interface Answer {
  value: number;
  isCorrect: boolean;
}

export interface Question {
  question: string;
  answers: Answer[];
}
