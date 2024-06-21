import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../../store/hooks/useAppSelector';
import { TransactionItem } from '../../../store/transaction/initialState';
import { createTransaction } from '../../../store/transaction/thunks';
import { withdraw } from '../../../store/account/actions';
import { addTransaction } from '../../../store/transaction/actions';
import { themeColors } from '../../../theme/colors';
import Input from './input';
import { showToast } from '../../../utils';
import { PixKeyTypeEnum } from '../../../store/unum/pix-key-type.enum';

type PixKeyType = 'email' | 'cpf' | 'cnpj' | 'phone' | 'random';

interface KeyRegex {
    type: PixKeyType;
    regex: RegExp;
}

const formatCurrency = (value: string): string => {
    const onlyDigits = value.replace(/\D/g, '');
    const formattedValue = (Number(onlyDigits) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formattedValue;
};

const keys: KeyRegex[] = [
    { type: 'email', regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/ },
    { type: 'cpf', regex: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/ },
    { type: 'cnpj', regex: /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/ },
    { type: 'phone', regex: /^\+?\d{1,2}?\(?\d{2}\)?\d{4,5}-?\d{4}$/ },
    { type: 'random', regex: /^[0-9a-fA-F]{32}$/ },
];

const PixKeyValidation: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [pixKey, setPixKey] = useState<{ value: string | null, type: string | null }>({ value: '', type: null });
    const [amount, setAmount] = useState<string>('');
    const [validKeys, setValidKeys] = useState<PixKeyType[] | null>([]);
    const [userName, setUserName] = useState<string | null>(null);

    const dispatch = useAppDispatch();
    const { account } = useAppSelector((store) => store.account);
    const { userInfo } = useAppSelector((store) => store.user);

    const handlePixKeyChange = (key: string) => {
        const validKeys: PixKeyType[] = keys.filter(({ regex }) => regex.test(key)).map(({ type }) => type);
        setPixKey({ value: key, type: null });
        setValidKeys(validKeys);
        setUserName(null);
    };

    const handlePixKeyTypeChange = (type: string) => {
        const selectedType: PixKeyType = type as PixKeyType;
        setPixKey({ ...pixKey, type: selectedType });

        if (isSameUserPixKey(pixKey.value || '')) {
            return showToast('error', 'Sua chave?');
        }

        if (validKeys!.length >= 1 && selectedType && pixKey.value) {
            fetch("http://192.168.1.41:3000/user/pixKey", {
                method: 'POST',
                body: JSON.stringify({ pixKey: pixKey.value, type: selectedType }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                    if (!data.name) {
                        showToast('error', 'Usuário não encontrado');
                        return;
                    }

                    setUserName(data.name);
                    setStep(2);
                })
                .catch(e => {
                    console.log(e);
                    showToast('error', 'Verifique a chave e tente novamente!');
                    return;
                })
        }
    };

    const handleAmountChange = (value: string) => {
        const formattedValue = formatCurrency(value);
        setAmount(formattedValue);
    };

    const convertToFloat = (text: string): number => {
        return parseFloat(text.replace(/\./g, '').replace(',', '.').replace('R$', ''));
    };

    const isValidAmount = (value: string): boolean => {
        const parsed = convertToFloat(value);
        return !isNaN(parsed) && parsed > 0.50;
    };

    const isSameUserPixKey = (payeePixKey: string): boolean => {
        return account.pixKeys.some(pixKey => pixKey.value === payeePixKey);
    }

    const handleSubmit = async () => {
        if (isValidAmount(amount) && pixKey.type && pixKey.value) {
            if (!Object.values(PixKeyTypeEnum).includes(pixKey.type)) {
                return showToast('error', 'Tipo de chave Pix inválido!');
            }

            const parsedAmount = convertToFloat(amount);

            try {
                if (account.balance < parsedAmount) {
                    return showToast('error', 'Saldo insuficiente!');
                }

                const transaction: TransactionItem = await dispatch(createTransaction({
                    payeePixKeyType: pixKey.type,
                    amount: parsedAmount,
                    payeePixKey: pixKey.value
                })).unwrap();

                if (!transaction) {
                    throw new Error('Erro ao efetuar a transação');
                }

                dispatch(withdraw(transaction.amount));
                dispatch(addTransaction(transaction));
                setAmount('');
                setStep(1);
                setPixKey({ value: null, type: null });
                setValidKeys(null);
                showToast('success', 'Transação realizada com sucesso!');
            } catch (err: unknown) {
                showToast('error', 'Erro ao efetuar a transação');
            }
        } else {
            showToast('error', 'O valor mínimo é de R$ 0,50.');
        }
    };


    const handleBack = () => {
        if (step > 1) {
            setStep(step => step - 1);
        }
    };

    return (
        <>
            <Text style={styles.title}>Enviar Pix</Text>
            <View style={styles.steps}>
                <View style={styles.stepContainer}>
                    <View style={[styles.stepCircle, step === 1 && styles.stepActive]}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]}></View>
                </View>
                <View style={styles.stepContainer}>
                    <View style={[styles.stepLine, step >= 2 && styles.stepLineActive]}></View>
                    <View style={[styles.stepCircle, step === 2 && styles.stepActive]}>
                        <Text style={styles.stepText}>2</Text>
                    </View>
                </View>
            </View>
            {step === 1 && (
                <View style={styles.stepContent}>
                    <Input
                        type='text'
                        placeholder="Chave PIX"
                        value={pixKey.value || ''}
                        handleChange={handlePixKeyChange}
                    />
                    {validKeys && validKeys.length > 0 && (
                        <View style={styles.validKeysContainer}>
                            <Text style={styles.validKeysLabel}>Qual o tipo da Chave?</Text>
                            {validKeys.map((key, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.keyOption}
                                    onPress={() => handlePixKeyTypeChange(key)}
                                >
                                    <View style={styles.keyOptionCircle}></View>
                                    <Text style={styles.keyOptionText}>{key}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            )}
            {step === 2 && (
                <View style={styles.stepContent}>
                    {userName && <Text style={styles.userName}>Usuário: {userName}</Text>}
                    <Input
                        type='text'
                        placeholder="R$"
                        value={amount}
                        handleChange={handleAmountChange}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleBack}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Transferir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#1E293B',
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#FFFFFF',
    },
    steps: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: themeColors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepActive: {
        backgroundColor: themeColors.error,
    },
    stepText: {
        color: themeColors.color,
        fontWeight: 'bold',
    },
    stepLine: {
        flex: 1,
        height: 4,
        backgroundColor: themeColors.secondary,
    },
    stepLineActive: {
        backgroundColor: themeColors.error,
    },
    stepContent: {
        marginBottom: 24,
    },
    input: {
        backgroundColor: '#475569',
        color: themeColors.color,
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    messageText: {
        color: themeColors.color,
    },
    validKeysContainer: {
        marginTop: 16,
    },
    validKeysLabel: {
        marginBottom: 8,
        fontSize: 16,
        color: themeColors.color,
    },
    keyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: themeColors.secondary,
        borderRadius: 8,
        marginBottom: 8,
    },
    keyOptionCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: themeColors.color,
        marginRight: 8,
    },
    keyOptionText: {
        color: themeColors.color,
    },
    userName: {
        fontSize: 16,
        marginBottom: 8,
        color: themeColors.color,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 12,
        backgroundColor: themeColors.error,
        borderRadius: 8,
    },
    buttonText: {
        color: themeColors.color,
        fontWeight: 'bold',
    },
});

export default PixKeyValidation;
