import { Injectable } from '@angular/core';
import{BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public supportedLanguages = ["da", "en"];

  constructor() {
    this.language = new BehaviorSubject<string>("da");
  }

  private language: BehaviorSubject<string>;

  public getLanguage(): Observable<string> {
    return this.language.asObservable();
  }

  public setLanguage(newValue: string): void {
    if(!this.supportedLanguages.includes(newValue)) return;
    this.language.next(newValue);
  }

}
