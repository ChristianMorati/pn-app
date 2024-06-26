export type PixKey = {
    accountId: number
    type: string
    value: string
    is_active: boolean
}

export type AccountItem = {
    id: number;
    balance: number;
    pixKeys: PixKey[];
};

export interface AccountState {
    account: AccountItem,
    pixKeys: null,
    error: any,
    statusAddingAmountToBalance: string | null;
    statusAddingAmountToBalanceLoading: boolean;
    status: string | null;
}

export const initialState: AccountState = {
    account: {} as AccountItem,
    pixKeys: null,
    error: null,
    status: null,
    statusAddingAmountToBalance: null,
    statusAddingAmountToBalanceLoading: false,
};