export type TransactionItem = {
    amount: number,
    payerUserId: number,
    payeePixKey: number,
    accountId: number,
    date: Date,
    success: boolean
}

export interface TransactionState {
    transaction: TransactionItem,
    error: any,
    status: string | null;
}

export const initialState: TransactionState = {
    transaction: {} as TransactionItem,
    error: null,
    status: null
};