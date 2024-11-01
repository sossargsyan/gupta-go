export enum ThemeType {
  Light = 'light-theme',
  Dark = 'dark-theme',
}

export enum SoundType {
  Correct = 'correct',
  Incorrect = 'incorrect',
  Results = 'results',
}

export interface MenuItem {
  name: string;
  icon: string;
  route: string;
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

export enum OperationSymbols {
  Addition = '+',
  Subtraction = '-',
  Multiplication = '×',
  Division = '÷',
}

export interface Game {
  id: Operations;
  levelId?: LevelType;
  levelTitle?: string;
  min: number;
  max: number;
  correctAnswers?: number;
  incorrectAnswers?: number;
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

export interface AnswerRecord {
  question: string;
  selectedAnswer: number;
  correctAnswer: number;
}
