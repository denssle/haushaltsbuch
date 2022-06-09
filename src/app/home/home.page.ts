import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {AddTransactionModalComponent} from './add-transaction-modal/add-transaction-modal.component';
import {TransactionService} from '../services/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private modalController: ModalController, private ts: TransactionService) {
  }

  ngOnInit(): void {
    this.ts.observeTransactions().subscribe(value => {
      console.log(value);
    });
  }

  clickAdd(): void {
    this.modalController.create({
      component: AddTransactionModalComponent,
    }).then(value => {
      value.present();
    });
  }
}
