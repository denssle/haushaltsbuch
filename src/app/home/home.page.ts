import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddTransactionModalComponent} from './add-transaction-modal/add-transaction-modal.component';
import {TransactionService} from '../services/transaction.service';
import {Transaction} from '../models/transaction';
import {TransactionsListModalComponent} from './transactions-list-modal/transactions-list-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  alleAusgaben: Transaction[] = [];
  alleEinnahmen: Transaction[] = [];
  summeAllerAusgaben = 0;
  summeAllerEinnahmen = 0;

  constructor(private modalController: ModalController, private ts: TransactionService) {
  }

  ngOnInit(): void {
    this.ts.observeTransactions().subscribe(value => {
      this.alleAusgaben = value.filter(trans => trans.type === 'ausgabe');
      this.alleEinnahmen = value.filter(trans => trans.type === 'einnahme');
      this.summeAllerAusgaben = this.alleAusgaben.reduce((r, d) => r + d.wert, 0);
      this.summeAllerEinnahmen = this.alleEinnahmen.reduce((r, d) => r + d.wert, 0);
    });
  }

  clickAdd(): void {
    this.modalController.create({
      component: AddTransactionModalComponent,
    }).then(value => {
      value.present();
    });
  }

  openTransactionsList(transactions: Transaction[], title: string) {
    this.modalController.create({
      component: TransactionsListModalComponent,
      componentProps: {transactions, title}
    }).then(value => {
      value.present();
    });
  }
}
