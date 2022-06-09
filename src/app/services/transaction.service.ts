import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionsKey = 'TRANSACTIONS';
  private transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  constructor() {
    this.load();
  }

  load(): Transaction[] {
    const value = localStorage.getItem(this.transactionsKey);
    const parse = JSON.parse(value).map(transaction => Object.assign(new Transaction(), transaction));
    this.transactions.next(parse);
    return parse;
  }

  save(newTransaction: Transaction): void {
    const list = this.load();
    list.push(newTransaction);
    localStorage.setItem(this.transactionsKey, JSON.stringify(list));
    this.transactions.next(list);
  }

  observeTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }
}
