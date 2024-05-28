import { useState } from "react";

export default function useLastPurchase() {
    const [lastPurchase, setLastPurchase] = useState(null);

    return {
        lastPurchase,
        setLastPurchase
    }
}