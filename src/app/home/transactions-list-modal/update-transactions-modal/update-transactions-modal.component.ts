import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Transaction} from '../../../models/transaction';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../../services/transaction.service';
import {TransactionKategorie} from '../../../models/tansactionKategorie';
import {Subscription} from 'rxjs';
import {TransactionKategorieService} from '../../../services/transaction-kategorie.service';

@Component({
  selector: 'app-update-transactions-modal',
  templateUrl: './update-transactions-modal.component.html',
  styleUrls: ['./update-transactions-modal.component.scss'],
})
export class UpdateTransactionsModalComponent implements OnInit, OnDestroy {
  @Input() transaction: Transaction;
  formGroup: FormGroup;
  kategories: TransactionKategorie[] = [];
  filteredKategories: TransactionKategorie[] = [];
  subscriptions: Subscription[] = [];

  constructor(private modalController: ModalController, private fb: FormBuilder,
              private ts: TransactionService, private tws: TransactionKategorieService) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      id: [this.transaction.id],
      type: new FormControl(this.transaction.type, Validators.required),
      wann: new FormControl(this.transaction.wann.toISOString().split('T')[0], Validators.required),
      wert: new FormControl(this.transaction.wert, Validators.required),
      was: new FormControl(this.transaction.was, Validators.required),
    });
    this.subscriptions.push(
      this.tws.observe().subscribe(value => {
        this.kategories = value;
        this.filterKategories();
      }));
    this.subscriptions.push(this.formGroup.get('type').valueChanges.subscribe(() => {
      this.filterKategories();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value?.unsubscribe());
    this.subscriptions = [];
  }

  closeModal(): void {
    this.modalController.dismiss();
  }

  update(): void {
    this.ts.update(this.formGroup.value);
    this.closeModal();
  }

  private filterKategories(): void {
    this.filteredKategories = this.kategories
      .filter(value => value.type === this.formGroup.get('type').value)
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}
