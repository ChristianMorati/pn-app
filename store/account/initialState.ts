export type PixKey = {
    accountId: number
    type: string
    value: string
    is_active: boolean
}

export type AccountItem = {
    balance: number
    pixKeys?: PixKey[];
};

export interface AccountState {
    account: AccountItem,
    pixKeys: undefined, // Initialize as undefined to avoid potential errors
    error: null,
    status: string | null;
}

export const initialState: AccountState = {
    account: {
        balance: 0,
        pixKeys: [],
    },
    pixKeys: undefined, // Initialize as undefined to avoid potential errors
    error: null,
    status: null
};