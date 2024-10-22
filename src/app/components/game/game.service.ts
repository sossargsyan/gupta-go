import { Injectable } from '@angular/core';

import { Question, Operations } from '../../types';

interface GeneratedQuestion {
  question: string;
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
    const question = `${firstNumber} + ${secondNumber} = ?`;
    const answer = firstNumber + secondNumber;
    return {
      question,
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
    const question = `${firstNumber} - ${secondNumber} = ?`;
    const answer = firstNumber - secondNumber;
    return {
      question,
      answer,
    };
  }

  private generateRandomMultiplicationOperation(
    min: number,
    max: number
  ): GeneratedQuestion {
    const firstNumber = this.getRandomNumberWithRange(min, max);
    const secondNumber = this.getRandomNumberWithRange(min, max);
    const question = `${firstNumber} × ${secondNumber} = ?`;
    const answer = firstNumber * secondNumber;
    return {
      question,
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
    const question = `${firstNumber} ÷ ${secondNumber} = ?`;
    const answer = firstNumber / secondNumber;
    return {
      question,
      answer,
    };
  }

  generateRandomOperation(
    operation: Operations,
    min: number,
    max: number
  ): Question {
    let generatedOperation = {
      question: '',
      answer: 0,
    };
    switch (operation) {
      case 'addition':
        generatedOperation = this.generateRandomAdditionOperation(min, max);
        break;
      case 'subtraction':
        generatedOperation = this.generateRandomSubtractionOperation(min, max);
        break;
      case 'multiplication':
        generatedOperation = this.generateRandomMultiplicationOperation(
          min,
          max
        );
        break;
      case 'division':
        generatedOperation = this.generateRandomDivisionOperation(min, max);
        break;
    }
    const incorrectAnswers = new Set<number>();
    while (incorrectAnswers.size < 3) {
      let incorrectAnswer =
        generatedOperation.answer + Math.floor(Math.random() * 10) - 5;
      if (incorrectAnswer !== generatedOperation.answer) {
        incorrectAnswers.add(incorrectAnswer);
      }
    }
    const incorrectVariants = Array.from(incorrectAnswers);
    const question = generatedOperation.question;
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
