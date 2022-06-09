import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Transaction} from '../../models/transaction';

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
}
