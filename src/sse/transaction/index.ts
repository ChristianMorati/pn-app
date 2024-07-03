import { Socket, io } from "socket.io-client";
import { store } from "../../store";
import { deposit } from "../../store/account/actions";
import { addTransaction } from "../../store/transaction/actions";
import { TransactionItem } from "../../store/transaction/initialState";
import { formatToCurrencyBRL, showToast } from "../../utils";
import SocketIoInit from "../socket";
import { TransactionEventsEnum } from "../../enum/transaction-events.enum";

export class TransactionObservable extends SocketIoInit {
    private transactionListener: ((data: TransactionItem) => void) | null = null;
    userId: number;
    socket: Socket;

    constructor(transactionObservable: Partial<TransactionObservable>) {
        super();
        this.userId = transactionObservable?.userId ?? 0;
        this.socket = io(this.baseURL, {
            query: { userId: this.userId.toString() },
            withCredentials: true,
            transports: ['websocket'],
        });
    }

    listenToIncomingTransaction() {
        if (this.transactionListener) {
            this.socket.off('transaction', this.transactionListener);
        }

        this.transactionListener = (data: any) => {
            const transaction: TransactionItem = data.transaction;
            store.dispatch(deposit(transaction.amount));
            store.dispatch(addTransaction(transaction));
            console.log(data);
            showToast('success', {
                header: 'Pix recebido!',
                text: formatToCurrencyBRL(transaction.amount) + ' foi adicionado!'
            });
        };

        this.socket.on(TransactionEventsEnum.TRANSACTION, this.transactionListener);
    }

    stopListeningToIncomingTransaction() {
        if (this.transactionListener) {
            this.socket.off(TransactionEventsEnum.TRANSACTION, this.transactionListener);
            this.transactionListener = null;
        }
    }
}
