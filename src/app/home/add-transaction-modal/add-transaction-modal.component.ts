import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Transaction} from '../../models/transaction';
import {TransactionService} from '../../services/transaction.service';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.scss'],
})
export class AddTransactionModalComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private modalController: ModalController, private fb: FormBuilder, private ts: TransactionService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      type: new FormControl('ausgabe', Validators.required),
      wann: new FormControl(new Date(Date.now()).toISOString().split('T')[0], Validators.required),
      wert: new FormControl(undefined, Validators.required),
      was: new FormControl('lebensmittel', Validators.required),
    });
  }

  closeModal() {
    this.modalController.dismiss();
  }

  save() {
    const newTransaction: Transaction = Object.assign(new Transaction(), this.formGroup.value);
    newTransaction.wann = new Date(this.formGroup.get('wann').value);
    this.ts.save(newTransaction);
    this.modalController.dismiss();
  }
}
