import React, { useState } from 'react';
import Input from '../trasaction/input';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import QRCodeGenerator from '../qrcode-generator';
import { TransactionItem } from '../../../store/transaction/initialState';
import Toast from 'react-native-toast-message';

interface QRCodeBillingProps {
    accountId: number;
    pixKey: string;
}

// toastConfig.js
import { StyleSheet } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { ToasterDark } from '../../layout/toaster';
import { useAppSelector } from '../../../store/hooks/useAppSelector';

export const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={styles.successToast}
            contentContainerStyle={styles.toastContent}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={styles.errorToast}
            contentContainerStyle={styles.toastContent}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
    info: (props) => (
        <BaseToast
            {...props}
            style={styles.infoToast}
            contentContainerStyle={styles.toastContent}
            text1Style={styles.text1}
            text2Style={styles.text2}
        />
    ),
};

const styles = StyleSheet.create({
    successToast: {
        borderLeftColor: 'green',
        backgroundColor: '#333',
    },
    errorToast: {
        borderLeftColor: 'red',
        backgroundColor: '#333',
    },
    infoToast: {
        borderLeftColor: 'blue',
        backgroundColor: '#333',
    },
    toastContent: {
        paddingHorizontal: 15,
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    text2: {
        fontSize: 14,
        color: '#fff',
    },
});


const QRCodeBilling: React.FC<QRCodeBillingProps> = ({ accountId, pixKey }) => {
    const [qrValue, setQrValue] = useState('');
    const [amount, setAmount] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const applyCurrencyMask = (value: string): string => {
        const onlyDigits = value.replace(/\D/g, '');
        const formattedValue = (Number(onlyDigits) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formattedValue;
    };

    const isValidAmount = (value: string): boolean => {
        const parsed = parseFloat(value.replace(/\./g, '').replace(',', '.').replace('R$', ''));
        return !isNaN(parsed) && parsed > 0.50;
    };

    const handleAmountChange = (text: string) => {
        const maskedValue = applyCurrencyMask(text);
        setAmount(maskedValue);
        setError(null);
    };

    const handleSubmit = () => {
        setError(null);
        if (isValidAmount(amount)) {
            const billing: Partial<TransactionItem> = {
                amount: parseFloat(amount.replace(/\./g, '').replace(',', '.').replace('R$', '')),
                accountId,
                payeePixKey: pixKey,
            };
            setQrValue(JSON.stringify(billing));
            setConfirmed(true);
            setError(null);
        } else {
            Toast.show({
                type: 'error',
                props: {
                    header: 'Ops...',
                    text: 'Valor mínimo é de 0,50'
                }
            });
        }
    };

    const handleClear = () => {
        setQrValue('');
        setAmount('');
        setConfirmed(false);
        setError(null);
    };

    return (
        <>
            <Text className='text-left p-2 bg-orange-200 text-orange-600 font-bold'>Somente usuários PIXNODE</Text>
            <Text className="text-2xl my-4 text-white text-center">Gerar cobrança QR</Text>
            {error && <Text className="p-2 bg-red-600 font-bold text-red-50 mt-2">{error}</Text>}
            <View className='flex flex-col justify-center items-center'>
                {!confirmed ? (
                    <>
                        <View className='py-2 w-full'>
                            <Input
                                type="text"
                                placeholder="R$"
                                value={amount}
                                handleChange={(text) => handleAmountChange(text)}
                                disabled={confirmed}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            className="py-2 px-4 mt-4 bg-orange-400 rounded hover:bg-orange-500 transition-colors duration-300"
                        >
                            <Text className="font-bold text-white uppercase">Gerar QR</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View className='flex flex-col justify-center items-center gap-2'>
                            <View>
                                <QRCodeGenerator value={qrValue} size={150} />
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={handleClear}
                                    className="py-2 px-4 mt-4 bg-gray-400 rounded hover:bg-orange-500 transition-colors duration-300"
                                >
                                    <Text className="font-bold text-white uppercase">LIMPAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </>
    );
}

export default QRCodeBilling;
