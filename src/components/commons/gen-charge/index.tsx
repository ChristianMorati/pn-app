import { useEffect, useState } from "react";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { Text } from "react-native";
import { Button } from "react-native";
import { themeColors } from "../../../theme/colors";
import { MoneyTextInput } from "../monetary-input";
import { serializers } from "../pix-key-selector";


export default function GenCharge() {
    const [checked, setChecked] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [money, setMoney] = useState('');
    const [inputError, setInputError] = useState('');
    const [inputMoneyError, setInputMoneyError] = useState('');
    const [isReady, setIsReady] = useState({ amount: false });
    const [payeeName, setPayeeName] = useState('');

    const { account } = useAppSelector(store => store.account);
    const dispatch = useAppDispatch();

    function resetComponent() {
        setChecked('');
        setInputValue('');
        setMoney('');
        setInputError('');
        setInputMoneyError('');
        setPayeeName('');
        setIsReady({ amount: false });
    }

    useEffect(() => {
        return () => { resetComponent() }
    }, [])

    const validateMoneyInput = (text: string) => {
        const formattedAmount = text.trim()
            .replace('R$', '')
            .replace(/\./g, '')
            .replace(',', '.');

        const amount = parseFloat(formattedAmount);

        if (amount > account.balance) {
            setInputMoneyError('Saldo insuficiente!');
            setIsReady((state) => ({ ...state, amount: false }));
        }
        else if (amount < 0.5) {
            setInputMoneyError('Valor abaixo do mínimo: 0,50');
            setIsReady((state) => ({ ...state, amount: false }));
        } else {
            setIsReady((state) => ({ ...state, amount: true }));
            setInputMoneyError('');
        }
    };

    const handleSubmit = async () => {
        const amount = parseFloat(serializers["money"](money));

        try {
            const transaction = await dispatch(createTransaction({ amount: amount, payeePixKey: pixKey }));
            setTransactionStatus('Transação criada com sucesso!');
        } catch (error) {
            console.log('error createTransaction', error);
            setTransactionStatus('Erro ao criar a transação.');
        }
    };

    return (
        <>
            {inputError ? <Text style={{ color: themeColors.error }}>{inputError}</Text> : <Text></Text>}

            <MoneyTextInput
                value={money} onChangeText={setMoney}
                validateMoneyInput={validateMoneyInput}
                inputMoneyError={inputMoneyError}
            />

            {isReady.amount && isReady.key && checked && payeeName.length > 0 && (
                < Button title='Send Money' onPress={handleSubmit} />
            )}
        </>
    );
};