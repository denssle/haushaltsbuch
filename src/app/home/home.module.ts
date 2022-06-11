import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import {HomePageRoutingModule} from './home-routing.module';
import {AddTransactionModalComponent} from './add-transaction-modal/add-transaction-modal.component';
import {TransactionsListModalComponent} from './transactions-list-modal/transactions-list-modal.component';
import {MenuModalComponent} from './menu-modal/menu-modal.component';
import {AddKategorieModalComponent} from './menu-modal/add-kategorie-modal/add-kategorie-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    AddTransactionModalComponent,
    TransactionsListModalComponent,
    MenuModalComponent,
    AddKategorieModalComponent,
  ]
})
export class HomePageModule {
}
