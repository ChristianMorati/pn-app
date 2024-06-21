import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { showToast } from "../../../utils";
import { refundTransaction } from "../../../store/transaction/thunks";
import { withdraw } from "../../../store/account/actions";
import { themeColors } from "../../../theme/colors";
import { TransactionItem } from "../../../store/transaction/initialState";

type RefundTransactionButtonProps = {
    transaction: TransactionItem
    buttonText: string
}

export default function RefundTransactionButton({ transaction, buttonText, ...props }: RefundTransactionButtonProps) {
    const dispatch = useAppDispatch();

    const handleRefundTransaction = () => {
        dispatch(refundTransaction(transaction)).then((data) => {
            dispatch(withdraw(transaction.amount));
            showToast('success', 'devolvido!');
        }).catch(() => {
            showToast('error', 'Sua chave?');
        });
    }

    return (
        <>
            <TouchableOpacity
                {...props}
                className="px-4 py-2 rounded-md border border-slate-500"
                onPress={handleRefundTransaction}
                style={{ backgroundColor: themeColors.primary }}
            >
                <Text className="text-center font-bold text-white">{buttonText}</Text>
            </TouchableOpacity>
        </>
    );
}