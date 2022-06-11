import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {TransactionKategorieService} from '../../../services/transaction-kategorie.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-kategorie-modal',
  templateUrl: './add-kategorie-modal.component.html',
  styleUrls: ['./add-kategorie-modal.component.scss'],
})
export class AddKategorieModalComponent implements OnInit {
  formGroup: FormGroup;
  icons: string[] = ['cash-outline', 'home-outline', 'pizza-outline', 'airplane-outline', 'balloon-outline'];

  constructor(private modalController: ModalController, private tws: TransactionKategorieService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      type: new FormControl('ausgabe', Validators.required),
      icon: new FormControl(undefined, Validators.required),
      label: new FormControl(undefined, Validators.required),
    });
  }

  closeModal(): void {
    this.modalController.dismiss();
  }

  save(): void {
    this.tws.save(this.formGroup.value);
    this.closeModal();
  }
}
