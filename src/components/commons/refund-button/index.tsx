import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { showToast } from "../../../utils";
import { refundTransaction } from "../../../store/transaction/thunks";
import { withdraw } from "../../../store/account/actions";
import { themeColors } from "../../../theme/colors";
import { TransactionItem } from "../../../store/transaction/initialState";
import { changeTypeOfTransactionToRefund } from "../../../store/transaction/actions";

type RefundTransactionButtonProps = {
    transaction: TransactionItem
    buttonText: string
}

const RefundTransactionButton: React.FC<RefundTransactionButtonProps> = ({
    transaction,
    buttonText,
    ...props
}) => {
    const dispatch = useAppDispatch();

    const handleRefundTransaction = () => {
        dispatch(refundTransaction(transaction))
            .then(() => {
                dispatch(withdraw(transaction.amount));
                dispatch(changeTypeOfTransactionToRefund(transaction))
                showToast('success', 'Devolvido!')
            })
            .catch(() => {
                showToast('error', 'Falha na devolução :( !')
            });
    };

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

export default RefundTransactionButton;