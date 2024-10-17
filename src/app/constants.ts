import { Level, Operations } from './types';

export const duration = 60;

export const homeRoute = '/';

export const levels: Level[] = [
  {
    id: 'single-digit-numbers',
    name: 'Single-Digit Numbers',
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
    id: 'two-digit-numbers',
    name: 'Two-Digit Numbers',
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
    id: 'three-digit-numbers',
    name: 'Three-Digit Numbers',
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
