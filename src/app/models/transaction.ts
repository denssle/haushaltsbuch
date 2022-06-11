import {TransactionsType} from './transactionsType';
import {TransactionKategorie} from './tansactionKategorie';
import * as moment from 'moment';

export class Transaction {
  id: number;
  type: TransactionsType;
  wann: moment.Moment;
  wert: number;
  was: TransactionKategorie;
}
