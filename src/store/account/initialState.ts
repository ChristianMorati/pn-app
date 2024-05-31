export type PixKey = {
    accountId: number
    type: string
    value: string
    is_active: boolean
}

export type AccountItem = {
    id: number;
    balance: number;
    pixKeys?: PixKey[];
};

export interface AccountState {
    account: AccountItem,
    pixKeys: undefined,
    error: any,
    status: string | null;
}

export const initialState: AccountState = {
    account: {} as AccountItem,
    pixKeys: undefined,
    error: null,
    status: null
};