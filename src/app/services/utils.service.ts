import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { version } from '../../../package.json';
import { OperationConfig } from '../types';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public getAppVersion(): Observable<string> {
    return of(version);
  }

  public getOperationConfigs(operationName: string): OperationConfig {
    switch (operationName) {
      case 'addition':
        return { text: '+', color: 'green' };
      case 'subtraction':
        return { text: '–', color: 'orange' };
      case 'multiplication':
        return { text: '×', color: 'blue' };
      case 'division':
        return { text: '÷', color: 'red' };
    }
    return { text: '', color: '' };
  }
}
