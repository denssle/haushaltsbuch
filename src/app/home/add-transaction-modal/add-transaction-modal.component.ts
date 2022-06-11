import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TransactionService} from '../../services/transaction.service';
import {TransactionKategorie} from '../../models/tansactionKategorie';
import {TransactionKategorieService} from '../../services/transaction-kategorie.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-transaction-modal',
  templateUrl: './add-transaction-modal.component.html',
  styleUrls: ['./add-transaction-modal.component.scss'],
})
export class AddTransactionModalComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  kategories: TransactionKategorie[] = [];
  filteredKategories: TransactionKategorie[] = [];
  subscriptions: Subscription[] = [];

  constructor(private modalController: ModalController, private fb: FormBuilder,
              private ts: TransactionService, private tws: TransactionKategorieService) {
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
        this.kategories = value;
        this.filterKategories();
        console.log(this.filteredKategories);
      }));
    this.subscriptions.push(this.formGroup.get('type').valueChanges.subscribe(() => {
      this.filterKategories();
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

  private filterKategories(): void {
    this.filteredKategories = this.kategories
      .filter(value => value.type === this.formGroup.get('type').value)
      .sort((a, b) => a.label.localeCompare(b.label));
  }
}
