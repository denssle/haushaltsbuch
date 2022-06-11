import {Injectable} from '@angular/core';
import {Transaction} from '../models/transaction';
import {BehaviorSubject, Observable} from 'rxjs';
import * as moment from 'moment';

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
    const json: any[] = JSON.parse(value);
    if (value && json && json.length) {
      const parse = json.map(transaction => this.jsonToTransaction(transaction));
      this.transactions.next(parse);
      return parse;
    } else {
      localStorage.setItem(this.transactionsKey, JSON.stringify([]));
      return [];
    }
  }

  save(data: Transaction): void {
    const list = this.transactions.getValue();
    list.push(this.jsonToTransaction(data));
    localStorage.setItem(this.transactionsKey, JSON.stringify(list));
    this.transactions.next(list);
  }

  observeTransactions(): Observable<Transaction[]> {
    return this.transactions.asObservable();
  }

  wipe(): void {
    localStorage.setItem(this.transactionsKey, JSON.stringify([]));
    this.transactions.next([]);
  }

  update(input: any): void {
    const transaction: Transaction = this.jsonToTransaction(input);
    const transactions: Transaction[] = this.transactions.getValue();
    const oldTransaction: Transaction = transactions.find(value1 => value1.id === transaction.id);
    transactions[transactions.indexOf(oldTransaction)] = transaction;
    localStorage.setItem(this.transactionsKey, JSON.stringify(transactions));
    this.transactions.next(transactions);
  }

  private jsonToTransaction(json: any): Transaction {
    const newTransaction: Transaction = Object.assign(new Transaction(), json);
    newTransaction.wann = moment(json.wann);
    if (!newTransaction.id) {
      newTransaction.id = newTransaction.wann.date() * Math.random();
    }
    return newTransaction;
  }
}
