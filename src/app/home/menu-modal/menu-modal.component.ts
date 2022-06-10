import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TransactionService} from '../../services/transaction.service';
import {TransactionWasService} from '../../services/transaction-was.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
})
export class MenuModalComponent implements OnInit {

  constructor(private modalController: ModalController, private ts: TransactionService, private tws: TransactionWasService) {
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

  wipeTransactions(): void {
    this.ts.wipe();
  }

  wipeWas() {
    this.tws.wipe();
  }
}
