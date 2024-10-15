import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { version } from '../../../package.json';

@Injectable({
  providedIn: 'root',
})
export class JsonReaderService {
  public getAppVersion(): Observable<string> {
    return of(version);
  }
}
