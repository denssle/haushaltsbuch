import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddTransactionModalComponent} from './add-transaction-modal/add-transaction-modal.component';
import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../models/transaction';
import {TransactionsListModalComponent} from './transactions-list-modal/transactions-list-modal.component';
import * as moment from 'moment';
import {MenuModalComponent} from './menu-modal/menu-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  transactions: Transaction[] = [];
  alleAusgaben: Transaction[] = [];
  alleEinnahmen: Transaction[] = [];
  summeAllerAusgaben = 0;
  summeAllerEinnahmen = 0;
  selectedDate: moment.Moment;

  constructor(private modalController: ModalController, private ts: TransactionService) {
  }

  ngOnInit(): void {
    this.selectedDate = moment();

    this.ts.observeTransactions().subscribe(value => {
      this.transactions = value;
      this.filterTransactionListByDate();
    });
  }

  clickAdd(): void {
    this.modalController.create({
      component: AddTransactionModalComponent,
    }).then(value => {
      value.present();
    });
  }

  openTransactionsList(transactions: Transaction[], title: string): void {
    this.modalController.create({
      component: TransactionsListModalComponent,
      componentProps: {transactions, title}
    }).then(value => {
      value.present();
    });
  }

  clickMenu(): void {
    this.modalController.create({
      component: MenuModalComponent,
    }).then(value => {
      value.present();
    });
  }

  clickLeft(): void {
    this.selectedDate.subtract(1, 'month');
    this.filterTransactionListByDate();
  }

  clickRight(): void {
    this.selectedDate.add(1, 'month');
    this.filterTransactionListByDate();
  }

  private filterTransactionListByDate(): void {
    this.useTransactionList(
      this.transactions.filter(value => value.wann.month() === this.selectedDate.month() && value.wann.date() === value.wann.date())
    );
  }

  private useTransactionList(value: Transaction[]): void {
    this.alleAusgaben = value.filter(trans => trans.type === 'ausgabe');
    this.alleEinnahmen = value.filter(trans => trans.type === 'einnahme');
    this.summeAllerAusgaben = this.alleAusgaben.reduce((nbr, d) => nbr + d.wert, 0);
    this.summeAllerEinnahmen = this.alleEinnahmen.reduce((nbr, d) => nbr + d.wert, 0);
  }
}
