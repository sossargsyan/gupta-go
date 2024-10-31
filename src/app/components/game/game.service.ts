import { Injectable } from '@angular/core';

import { Question, Operations, OperationSymbols } from '../../types';
import { optionsCount } from '../../constants';

interface GeneratedQuestion {
  firstNumber: number;
  secondNumber: number;
  operation: OperationSymbols;
  answer: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private getRandomNumberWithRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  private generateRandomAdditionOperation(
    min: number,
    max: number
  ): GeneratedQuestion {
    const firstNumber = this.getRandomNumberWithRange(min, max);
    const secondNumber = this.getRandomNumberWithRange(min, max);
    const answer = firstNumber + secondNumber;
    return {
      firstNumber,
      secondNumber,
      operation: OperationSymbols.Addition,
      answer,
    };
  }

  private generateRandomSubtractionOperation(
    min: number,
    max: number
  ): GeneratedQuestion {
    let firstNumber = this.getRandomNumberWithRange(min, max);
    let secondNumber = this.getRandomNumberWithRange(min, max);
    if (firstNumber < secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber];
    }
    const answer = firstNumber - secondNumber;
    return {
      firstNumber,
      secondNumber,
      operation: OperationSymbols.Subtraction,
      answer,
    };
  }

  private generateRandomMultiplicationOperation(
    min: number,
    max: number
  ): GeneratedQuestion {
    const firstNumber = this.getRandomNumberWithRange(min, max);
    const secondNumber = this.getRandomNumberWithRange(min, max);
    const answer = firstNumber * secondNumber;
    return {
      firstNumber,
      secondNumber,
      operation: OperationSymbols.Multiplication,
      answer,
    };
  }

  private generateRandomDivisionOperation(
    min: number,
    max: number
  ): GeneratedQuestion {
    const firstNumber = this.getRandomNumberWithRange(min, max);
    let possibleDivisors = [];
    for (let i = 1; i <= max; i++) {
      if (firstNumber % i === 0) {
        possibleDivisors.push(i);
      }
    }
    let secondNumber =
      possibleDivisors[Math.floor(Math.random() * possibleDivisors.length)];
    const answer = firstNumber / secondNumber;
    return {
      firstNumber,
      secondNumber,
      operation: OperationSymbols.Division,
      answer,
    };
  }

  generateRandomOperation(
    operationName: Operations,
    min: number,
    max: number
  ): Question {
    let generatedOperation = {
      firstNumber: 0,
      secondNumber: 0,
      operation: '',
      answer: 0,
    };
    let incorrectUpperLimit = max;
    switch (operationName) {
      case 'addition':
        generatedOperation = this.generateRandomAdditionOperation(min, max);
        incorrectUpperLimit = generatedOperation.answer + max + 1;
        break;
      case 'subtraction':
        generatedOperation = this.generateRandomSubtractionOperation(min, max);
        incorrectUpperLimit = generatedOperation.firstNumber + optionsCount;
        break;
      case 'multiplication':
        generatedOperation = this.generateRandomMultiplicationOperation(
          min,
          max
        );
        incorrectUpperLimit = max * max;
        break;
      case 'division':
        generatedOperation = this.generateRandomDivisionOperation(min, max);
        break;
    }
    const incorrectAnswers = new Set<number>();
    while (incorrectAnswers.size < optionsCount - 1) {
      let incorrectAnswer = Math.floor(Math.random() * incorrectUpperLimit);
      if (incorrectAnswer !== generatedOperation.answer) {
        incorrectAnswers.add(incorrectAnswer);
      }
    }
    const incorrectVariants = Array.from(incorrectAnswers);
    const { firstNumber, secondNumber, operation } = generatedOperation;
    const question = `${firstNumber} ${operation} ${secondNumber} = ?`;
    const answers = [
      { value: generatedOperation.answer, isCorrect: true },
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
