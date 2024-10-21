import { Injectable } from '@angular/core';

import { Question, LevelType, Operations } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  generateRandomOperation(operation: Operations, level?: LevelType): Question {
    let firstNumber = Math.floor(Math.random() * 10);
    let secondNumber = Math.floor(Math.random() * 10);
    let result = 0;
    let operationSymbol = '';
    switch (level) {
      case LevelType.TwoDigit:
        firstNumber = Math.floor(Math.random() * 90) + 10;
        secondNumber = Math.floor(Math.random() * 90) + 10;
        break;
      case LevelType.ThreeDigit:
        firstNumber = Math.floor(Math.random() * 900) + 100;
        secondNumber = Math.floor(Math.random() * 900) + 100;
        break;
    }
    switch (operation) {
      case 'addition':
        result = firstNumber + secondNumber;
        operationSymbol = '+';
        break;
      case 'subtraction':
        result = firstNumber - secondNumber;
        operationSymbol = '-';
        break;
      case 'multiplication':
        result = firstNumber * secondNumber;
        operationSymbol = '×';
        break;
      case 'division':
        result = firstNumber / secondNumber;
        operationSymbol = '÷';
        break;
    }
    const incorrectAnswers = new Set<number>();
    while (incorrectAnswers.size < 3) {
      let incorrectAnswer = result + Math.floor(Math.random() * 10) - 5;
      if (incorrectAnswer !== result) {
        incorrectAnswers.add(incorrectAnswer);
      }
    }
    const incorrectVariants = Array.from(incorrectAnswers);
    const question = `${firstNumber} ${operationSymbol} ${secondNumber} = ?`;
    const answers = [
      { value: result, isCorrect: true },
      { value: incorrectVariants[0], isCorrect: false },
      { value: incorrectVariants[1], isCorrect: false },
      { value: incorrectVariants[2], isCorrect: false },
    ];
    answers.sort(() => Math.random() - 0.5);
    return {
      question,
      answers,
    };
  }
}
