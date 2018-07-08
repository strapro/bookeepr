export interface Transaction {
    id?;
    type?: TransactionType;
    amount?: Number;
    vat?: Number;
    date?: Date;
    entity?: {
        entityId?;
        entityName?: String;
    };
    tags?: Array<{
        tagId?: String;
        tagName?: String;
        tagColor?: String;
    }>;
    comments?: String;
}
