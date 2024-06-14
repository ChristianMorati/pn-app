import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import { styles } from './style';
import { createTransaction } from '../../../store/transaction/thunks';
import { MoneyTextInput } from '../monetary-input';
import { themeColors } from '../../../theme/colors';
import { userService } from '../../../services/user-service';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { withdraw } from '../../../store/account/actions';

const keyOptions = [
    { option: 'CPF', mask: 'cpf', regex: /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/ },
    { option: 'Telefone', mask: 'cel-phone', regex: /^\(\d{2}\)\s\d{4,5}\-\d{4}$/ },
    { option: 'Email', mask: null, regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    { option: 'Aleatória', mask: null, regex: /^[a-zA-Z0-9]{8,}$/ }
];

export const serializers = {
    "CPF": (text: string) => text.replace(/[^\d]/g, ''),
    "Telefone": (text: string) => text.replace(/[^0-9]/g, ''),
    "money": (text: string) => text.replace(/[^\d,]/g, '').replace(',', '.'),
    "default": (text: string) => text
};

type MaskInputProps = {
    setInputValue: Dispatch<SetStateAction<string>>;
    inputValue: string;
    checked: string;
    validateInput: (text: string) => void;
    inputError: string;
}

function MaskInput({ setInputValue, inputValue, validateInput, checked, inputError }: MaskInputProps) {
    const selectedOption = keyOptions.find((_, index) => `option${index}` === checked);

    if (selectedOption && selectedOption.mask !== null) {
        return (
            <TextInputMask
                type={selectedOption?.mask}
                style={[
                    styles.input,
                    {
                        color: inputError ? themeColors.error : themeColors.color,
                        borderBottomColor: inputError ? themeColors.error : themeColors.color,
                    },
                ]}
                placeholder={selectedOption?.option}
                placeholderTextColor={themeColors.color}
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    validateInput(text);
                }}
            />
        );
    } else {
        return (
            <TextInput
                style={styles.input}
                placeholder={selectedOption?.option}
                placeholderTextColor={themeColors.color}
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    validateInput(text);
                }}
            />
        );
    }
}


export default function PixKeySelector() {
    const [checked, setChecked] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [money, setMoney] = useState('');
    const [inputError, setInputError] = useState('');
    const [inputMoneyError, setInputMoneyError] = useState('');
    const [isReady, setIsReady] = useState({ key: false, amount: false });
    const [payeeName, setPayeeName] = useState('');
    const [transactionStatus, setTransactionStatus] = useState('');

    const { account } = useAppSelector(store => store.account);
    const { status } = useAppSelector(store => store.transaction);
    const dispatch = useAppDispatch();

    function resetComponent() {
        setChecked('');
        setInputValue('');
        setMoney('');
        setInputError('');
        setInputMoneyError('');
        setPayeeName('');
        setIsReady({ key: false, amount: false });
        setTransactionStatus('');
    }

    useEffect(() => {
        return () => { resetComponent() }
    }, [])

    const validateInput = (text: string) => {
        const selectedOption = keyOptions.find((_, index) => `option${index}` === checked);
        if (selectedOption && !selectedOption.regex.test(text)) {
            setInputError('Insira um valor correto para a chave selecionada');
            setIsReady((state) => ({ ...state, key: false }));
        } else {
            setIsReady((state) => ({ ...state, key: true }));
            setInputError('');
        }
    };

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
        const pixKey = getValidatedPixKey();
        const amount = parseFloat(serializers["money"](money));

        try {
            const transaction = await dispatch(createTransaction({ amount: amount, payeePixKey: pixKey }));
            setTransactionStatus('Transação criada com sucesso!');
            dispatch(withdraw(transaction.payload.amount));
        } catch (error) {
            console.log('error createTransaction', error);
            setTransactionStatus('Erro ao criar a transação.');
        }
    };

    const getValidatedPixKey = () => {
        const pixKeyInput = serializers[checked] || serializers["default"];
        const processedCheckedValue = pixKeyInput(inputValue).trim().toLowerCase();
        return processedCheckedValue;
    }

    const getPayeeUserName = async (pixKey: string) => {
        try {
            const userName = await userService.findUserByPixKey(pixKey);
            setPayeeName(userName);
            return userName;
        } catch (error) {
            setPayeeName('');
            return null;
        }
    }

    useEffect(() => {
        if (isReady.key && checked) {
            getPayeeUserName(getValidatedPixKey());
        };

    }, [isReady])

    return (
        <>
            {transactionStatus ? (
                <View className="bg-slate-200 p-2 rounded-md">
                    <Text className="font-bold">{transactionStatus}</Text>
                    < Button title='Realizar outra?' onPress={resetComponent} />
                </View>
            ) : (
                <>
                    <Text style={styles.label}>Selecione o tipo da chave:</Text>
                    <View style={styles.radioGroup}>
                        {keyOptions.map((item, index) => {
                            const value = `option${index}`;
                            return (
                                <View key={value} style={styles.radioButton}>
                                    <RadioButton
                                        value={value}
                                        status={checked === value ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(value);
                                            setInputValue('');
                                            setInputError('');
                                        }}
                                    />
                                    <Text style={styles.radioText} onPress={() => setChecked(value)}>{item.option}</Text>
                                </View>
                            );
                        })}
                    </View>
                    {inputError ? <Text style={styles.error}>{inputError}</Text> : <Text></Text>}
                    <MaskInput
                        setInputValue={setInputValue}
                        inputValue={inputValue}
                        validateInput={text => validateInput(text)}
                        checked={checked}
                        inputError={inputError}
                    />

                    {isReady.key && checked && payeeName && (
                        <>
                            <Text style={{ color: themeColors.color }}>{'Nome do destinatário:'}</Text>
                            <Text style={{ color: themeColors.color }}>{payeeName}</Text>
                        </>
                    )}

                    <Text style={{ color: themeColors.success }}>Saldo: R$ {account.balance}</Text>
                    <MoneyTextInput
                        value={money} onChangeText={setMoney}
                        validateMoneyInput={validateMoneyInput}
                        inputMoneyError={inputMoneyError}
                    />

                    {isReady.amount && isReady.key && checked && payeeName.length > 0 && (
                        < Button title='Send Money' onPress={handleSubmit} />
                    )}
                </>
            )}
        </>
    );
};