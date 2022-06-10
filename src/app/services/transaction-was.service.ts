import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TransactionWas} from '../models/tansactionWas';

@Injectable({
  providedIn: 'root'
})
export class TransactionWasService {
  private waskey = 'WASKEY';
  private subject: BehaviorSubject<TransactionWas[]> = new BehaviorSubject([]);

  constructor() {
    this.load();
  }

  load() {
    const value = localStorage.getItem(this.waskey);
    const json: any[] = JSON.parse(value);
    if (value && json && json.length) {
      const parse = json.map(transaction => this.jsonToTransactionWas(transaction));
      this.subject.next(parse);
      return parse;
    } else {
      const standardList: TransactionWas[] = [
        {label: 'Gehalt', icon: '', type: 'einnahme'},
        {label: 'Miete', icon: '', type: 'ausgabe'},
        {label: 'Lebensmittel', icon: '', type: 'ausgabe'},
      ];
      localStorage.setItem(this.waskey, JSON.stringify(standardList));
      return standardList;
    }
  }

  save(): void {

  }

  observe(): Observable<TransactionWas[]> {
    return this.subject.asObservable();
  }

  wipe(): void {
    localStorage.setItem(this.waskey, JSON.stringify([]));
    this.load();
  }

  private jsonToTransactionWas(transaction: any): TransactionWas {
    return Object.assign(new TransactionWas(), transaction);
  }
}
