import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public getOperationIcon(operationName: string): string {
    switch (operationName) {
      case 'addition':
        return 'add';
      case 'subtraction':
        return 'remove';
      case 'multiplication':
        return 'close';
      case 'division':
        return 'open_with';
    }
    return 'calculate';
  }
}
