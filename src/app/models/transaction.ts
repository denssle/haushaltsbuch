import {TransactionsType} from './transactionsType';
import {TransactionsWas} from './tansactionsWas';

export class Transaction {
  type: TransactionsType;
  wann: Date;
  wert: number;
  was: TransactionsWas;
}
