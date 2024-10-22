import { Level, LevelType, Operations } from './types';

export const gameDuration = 60;

export const homeRoute = '/';

export const mockLevels: Level[] = [
  {
    id: LevelType.SingleDigit,
    name: 'Level 1',
    title: 'Single-Digit Numbers',
    games: [
      {
        id: Operations.Addition,
        min: 0,
        max: 9,
      },
      {
        id: Operations.Subtraction,
        min: 0,
        max: 9,
      },
      {
        id: Operations.Multiplication,
        min: 0,
        max: 9,
      },
      {
        id: Operations.Division,
        min: 0,
        max: 9,
      },
    ],
  },
  {
    id: LevelType.TwoDigit,
    name: 'Level 2',
    title: 'Two-Digit Numbers',
    games: [
      {
        id: Operations.Addition,
        min: 10,
        max: 99,
      },
      {
        id: Operations.Subtraction,
        min: 10,
        max: 99,
      },
      {
        id: Operations.Multiplication,
        min: 10,
        max: 99,
      },
      {
        id: Operations.Division,
        min: 10,
        max: 99,
      },
    ],
  },
  {
    id: LevelType.ThreeDigit,
    name: 'Level 3',
    title: 'Three-Digit Numbers',
    games: [
      {
        id: Operations.Addition,
        min: 100,
        max: 999,
      },
      {
        id: Operations.Subtraction,
        min: 100,
        max: 999,
      },
      {
        id: Operations.Multiplication,
        min: 100,
        max: 999,
      },
      {
        id: Operations.Division,
        min: 100,
        max: 999,
      },
    ],
  },
];
