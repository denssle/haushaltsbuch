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
    const parse = JSON.parse(value).map(transaction => this.jsonToTransaction(transaction));
    this.transactions.next(parse);
    return parse;
  }

  save(data: Transaction): void {
    const list = this.load();
    list.push(this.jsonToTransaction(data));
    localStorage.setItem(this.transactionsKey, JSON.stringify(list));
    this.transactions.next(list);
  }

  observeTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  private jsonToTransaction(json: any): Transaction {
    const newTransaction: Transaction = Object.assign(new Transaction(), json);
    newTransaction.wann = new Date(newTransaction.wann);
    return newTransaction;
  }
}
