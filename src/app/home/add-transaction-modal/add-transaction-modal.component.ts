import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';
import {TransactionWas} from '../../models/tansactionWas';
import {TransactionWasService} from '../../services/transaction-was.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.scss'],
})
export class AddTransactionModalComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  wasList: TransactionWas[] = [];
  subscriptions: Subscription[] = [];

  constructor(private modalController: ModalController, private fb: FormBuilder,
              private ts: TransactionService, private tws: TransactionWasService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      type: new FormControl('ausgabe', Validators.required),
      wann: new FormControl(new Date(Date.now()).toISOString().split('T')[0], Validators.required),
      wert: new FormControl(undefined, Validators.required),
      was: new FormControl(undefined, Validators.required),
    });
    this.subscriptions.push(
      this.tws.observe().subscribe(value => {
        console.log(value);
        this.wasList = value;
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    this.ts.save(this.formGroup.value);
    this.modalController.dismiss();
  }
}
