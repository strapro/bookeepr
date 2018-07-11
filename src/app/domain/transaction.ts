import {TransactionType} from './transaction_type';
import {Entity} from './entity';
import {Tag} from './tag';

export interface Transaction {
    id?: string;
    type?: TransactionType;
    amount?: number;
    vat?: number;
    date?: Date;
    entity?: Entity;
    tags?: Array<Tag>;
    comments?: string;
}
