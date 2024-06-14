import { useEffect, useState } from "react";
import { Button, Dimensions, Text, TouchableOpacity, View } from "react-native";
import QRCodeScanner, { HandleBarCodeScanned } from "../scanner";
import Modal from 'react-native-modal';
import { createTransaction } from "../../../store/transaction/thunks";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { withdraw } from "../../../store/account/actions";
import { LinearGradient } from "expo-linear-gradient";
import { themeColors } from "../../../theme/colors";
import { gradientStyle } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "tailwindcss/colors";
import { formatToCurrencyBRL } from "../../../utils";

export default function PayWithQrCode() {
    const [scanned, setScanned] = useState(false);
    const [transactionError, setTransactionError] = useState('');
    const [modalInfo, setModalInfo] = useState({
        payeeName: '',
        amount: 0,
        payerUserId: '',
        payeePixKey: '',
        modalVisible: false
    });
    const [transactionSuccess, setTransactionSuccess] = useState('');
    const deviceWidth = Dimensions.get('window').width;

    const { userInfo } = useAppSelector(store => store.user);
    const { account } = useAppSelector(store => store.account);
    const dispatch = useAppDispatch();

    type PayWithQrCodeData = {
        amount: number
        payeePixKey: string
        payeeName: string
    }

    const handleBarCodeScanned: HandleBarCodeScanned = async ({ type, data }) => {
        resetMessages();
        setScanned(true);
        const payWithQrCodeData: PayWithQrCodeData = JSON.parse(data);
        const { amount, payeePixKey, payeeName } = payWithQrCodeData

        setModalInfo({
            payerUserId: userInfo.id,
            amount: amount,
            payeePixKey: payeePixKey,
            payeeName: payeeName,
            modalVisible: true
        });
    }

    const hideModal = () => {
        setModalInfo((state) => {
            return {
                ...state,
                modalVisible: false
            }
        })
    }

    const handleSubmit = async () => {
        if (account.balance < modalInfo.amount) {
            throw new Error("Saldo insuficiente!.");
        }

        try {
            const transaction: any = await dispatch(createTransaction({
                amount: modalInfo.amount,
                payeePixKey: modalInfo.payeePixKey
            }));

            if (transaction.error) {
                throw new Error("Erro ao efetuar a transação.");
            }

            dispatch(withdraw(transaction.payload.amount));
            setTransactionSuccess('Transação efetuada com sucesso!');
        } catch (error) {
            setTransactionError('Erro ao efetuar a transação.');
        }
        resetComponent();
    };

    const resetMessages = () => {
        setTransactionError('');
        setTransactionSuccess('');
    }

    const resetComponent = () => {
        setModalInfo({
            payeeName: '',
            amount: 0,
            payerUserId: '',
            payeePixKey: '',
            modalVisible: false
        });
        setScanned(false);
    }

    useEffect(() => {
        // return () => resetComponent();   
        return resetMessages;
    }, []);

    return (
        <>
            {!modalInfo.modalVisible && (
                <>
                    <QRCodeScanner
                        handleBarCodeScanned={handleBarCodeScanned}
                        scanned={scanned}
                        setScanned={setScanned}
                    />
                    <View className="flex absolute top-0 z-10 justify-center items-center w-[100%] h-[100%]"
                        style={{ backgroundColor: 'rgba(0,0,0,.3)' }}
                    >
                        {transactionError || transactionSuccess ? (
                            <View className="flex absolute top-0 z-10 justify-start items-center w-[100%] bg-slate-50 rounded-b-xl">
                                {transactionError && (
                                    <View className=" w-[100%] bg-red-100 p-3  rounded-md mb-4">
                                        <Text style={{ color: themeColors.error }} className="text-xl font-semibold text-center">
                                            {transactionError}
                                        </Text>
                                    </View>
                                )}
                                {transactionSuccess && (
                                    <View className="w-[100%] bg-green-100 p-3 rounded-md mb-4">
                                        <Text style={{ color: themeColors.success }} className="text-xl font-semibold text-center">
                                            {transactionSuccess}
                                        </Text>
                                        <Text style={{ color: themeColors.success }} className="text-xl font-semibold text-center">
                                            V{modalInfo.amount}
                                        </Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    className="p-2 my-2 rounded-md"
                                    style={{ backgroundColor: transactionError ? themeColors.error : themeColors.success }}
                                    onPress={resetMessages}
                                >
                                    <Text
                                        style={{ color: themeColors.color }}
                                        className="text-center font-bold capitalize">
                                        Fechar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <>
                            </>
                        )}
                        <View className="absolute top-0 rounded-b-lg w-[100%] bg-slate-50">
                            <Text className="font-bold text-lg text-center p-4">Aponte para o QR code</Text>
                        </View>
                        <View className="bg-slate-50/5 border-slate-200/20 border-2" style={{ width: deviceWidth / 1.5, aspectRatio: 1 }}></View>
                    </View>
                </>
            )}
            <Modal
                isVisible={modalInfo.modalVisible}
            >
                <View className="overflow-hidden rounded-lg p-4" style={{ backgroundColor: themeColors.secondary }}>
                    <LinearGradient
                        colors={[themeColors.primary, themeColors.secondary]}
                        style={[gradientStyle.bg, { height: 120 }]}
                    />
                    <View className="flex flex-row justify-end">
                        <TouchableOpacity
                            className="rounded-md"
                            onPress={hideModal}
                        >
                            <MaterialCommunityIcons name="close" size={24} color={themeColors.error} />
                        </TouchableOpacity>
                    </View>
                    <View className="gap-3">
                        <View className="">
                            <Text
                                style={{ color: themeColors.color }}
                                className="text-xl">Destinatário:
                            </Text>
                            <View className="flex-row items-center">
                                <MaterialCommunityIcons name="star-four-points" size={12} color={themeColors.color} />
                                <Text
                                    style={{ color: themeColors.color }}
                                    className="pl-2 font-semibold text-xl">
                                    {modalInfo.payeeName}
                                </Text>
                            </View>
                            <View
                                style={{ borderColor: themeColors.borderColor }}
                                className="flex-row justify-between p-2 border-t-2"
                            >
                                <Text
                                    style={{ color: themeColors.success }}
                                    className="text-right font-bold">
                                    {`Em conta `}
                                </Text>
                                <Text
                                    style={{ color: themeColors.success }}
                                    className="text-right font-bold">
                                    {`: ${formatToCurrencyBRL(account.balance)}`}
                                </Text>
                            </View>
                            <View
                                style={{ borderColor: themeColors.borderColor }}
                                className="flex-row justify-end p-2 border-t-2"
                            >
                                <Text
                                    style={{ color: themeColors.error }}
                                    className="text-right font-bold">
                                    {`- ${formatToCurrencyBRL(modalInfo.amount)}`}
                                </Text>
                            </View>
                            <View
                                style={{ borderColor: themeColors.borderColor }}
                                className="flex-row justify-end p-2 border-t-2"
                            >
                                <Text
                                    style={{ color: themeColors.color }}
                                    className="text-right font-bold">
                                    {`${formatToCurrencyBRL(account.balance - modalInfo.amount)}`}
                                </Text>
                            </View>
                        </View>
                        <View
                            className="rounded-lg p-4"
                            style={{ backgroundColor: themeColors.secondary }}
                        >
                            <Text
                                style={{ color: themeColors.color }}
                                className="font-bold text-3xl text-center">{formatToCurrencyBRL(modalInfo.amount)}
                            </Text>
                        </View>
                    </View>
                    <View className="pt-4">
                        <TouchableOpacity
                            className="p-2 rounded-md"
                            style={{ backgroundColor: colors.green[500] }}
                            onPress={handleSubmit}
                        >
                            <Text
                                style={{ color: themeColors.color }}
                                className="text-lg text-center font-bold uppercase">
                                Pagar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}
