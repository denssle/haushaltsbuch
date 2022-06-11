import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TransactionKategorie} from '../models/tansactionKategorie';

@Injectable({
  providedIn: 'root'
})
export class TransactionKategorieService {
  private kategorieKey = 'WASKEY';
  private subject: BehaviorSubject<TransactionKategorie[]> = new BehaviorSubject([]);

  constructor() {
    this.load();
  }

  load(): TransactionKategorie[] {
    const value = localStorage.getItem(this.kategorieKey);
    const json: any[] = JSON.parse(value);
    if (value && json && json.length) {
      const parse = json.map(transaction => this.jsonToTransactionWas(transaction));
      this.subject.next(parse);
      return parse;
    } else {
      const standardList: TransactionKategorie[] = [
        {label: 'Gehalt', icon: 'cash-outline', type: 'einnahme'},
        {label: 'Miete', icon: 'home-outline', type: 'ausgabe'},
        {label: 'Lebensmittel', icon: 'pizza-outline', type: 'ausgabe'},
      ];
      localStorage.setItem(this.kategorieKey, JSON.stringify(standardList));
      return standardList;
    }
  }

  save(newKategorie: any): void {
    const list = this.load();
    list.push(this.jsonToTransactionWas(newKategorie));
    this.subject.next(list);
    localStorage.setItem(this.kategorieKey, JSON.stringify(list));
  }

  observe(): Observable<TransactionKategorie[]> {
    return this.subject.asObservable();
  }

  wipe(): void {
    localStorage.setItem(this.kategorieKey, JSON.stringify([]));
    this.load();
  }

  private jsonToTransactionWas(transaction: any): TransactionKategorie {
    return Object.assign(new TransactionKategorie(), transaction);
  }
}
