import {TransactionsType} from './transactionsType';
import {TransactionsWas} from './tansactionsWas';
import * as moment from 'moment';

export class Transaction {
  type: TransactionsType;
  wann: moment.Moment;
  wert: number;
  was: TransactionsWas;
}
