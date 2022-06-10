import {TransactionsType} from './transactionsType';
import {TransactionKategorie} from './tansactionKategorie';
import * as moment from 'moment';

export class Transaction {
  type: TransactionsType;
  wann: moment.Moment;
  wert: number;
  was: TransactionKategorie;
}
