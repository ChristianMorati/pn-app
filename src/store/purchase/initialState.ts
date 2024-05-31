
export type PurchaseState = {
    lastPurchase: any,
    allPurchases: any,
    loading: boolean,
    loadingAllPurchases: boolean,
}

export const initialState: PurchaseState = {
    lastPurchase: [],
    allPurchases: [],
    loading: true,
    loadingAllPurchases: true,
}