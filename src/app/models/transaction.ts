import {TransactionsType} from './transactionsType';
import {TransactionWas} from './tansactionWas';
import * as moment from 'moment';

export class Transaction {
  type: TransactionsType;
  wann: moment.Moment;
  wert: number;
  was: TransactionWas;
}
