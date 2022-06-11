import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TransactionService} from '../../services/transaction.service';
import {TransactionKategorieService} from '../../services/transaction-kategorie.service';
import {AddKategorieModalComponent} from './add-kategorie-modal/add-kategorie-modal.component';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss'],
})
export class MenuModalComponent implements OnInit {

  constructor(private modalController: ModalController, private ts: TransactionService, private tws: TransactionKategorieService) {
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

  addKategorie() {
    this.modalController.create({
      component: AddKategorieModalComponent,
    }).then(value => {
      value.present();
    });
  }
}
