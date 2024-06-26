import { PixKeyTypeEnum } from "../unum/pix-key-type.enum";

export type TransactionItem = {
    id: number,
    amount: number,
    payerUserId: number,
    payeePixKey: string,
    payeePixKeyType: string,
    accountId: number,
    date: Date,
    type: string,
    success?: boolean
}

export interface TransactionState {
    transaction: TransactionItem,
    myTransactions: TransactionItem[],
    error: any,
    status: string | null;
    loadMyTransactionsStatus: string | null;
    loadMyTransactionsError: any;
}

export const initialState: TransactionState = {
    transaction: {} as TransactionItem,
    myTransactions: [],
    error: null,
    status: null,
    loadMyTransactionsStatus: null,
    loadMyTransactionsError: null,
};