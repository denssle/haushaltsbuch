import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Transaction} from '../../models/transaction';
import {UpdateTransactionsModalComponent} from './update-transactions-modal/update-transactions-modal.component';

@Component({
  selector: 'app-transactions-list-modal',
  templateUrl: './transactions-list-modal.component.html',
  styleUrls: ['./transactions-list-modal.component.scss'],
})
export class TransactionsListModalComponent implements OnInit {
  // Data passed in by componentProps
  @Input() transactions: Transaction[] = [];
  @Input() title: string;

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  clickTransaction(transaction: Transaction): void {
    this.modalController.create({
      component: UpdateTransactionsModalComponent,
      componentProps: {transaction},
    }).then(value => {
      value.present();
    });
  }
}
