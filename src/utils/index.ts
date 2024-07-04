import Toast from "react-native-toast-message";

const formatToCurrencyBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

function formatToDateBRL(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(dateObj);
}


export type ToastProps = {
    header?: string;
    text: string;
}

function showToast(type: 'success' | 'error', toastBody: ToastProps | string) {
    const defaultHeader = type === 'error' ? 'Ops...' : 'Sucesso!';

    Toast.show({
        type,
        props: {
            header: typeof toastBody === "object" ? toastBody.header : defaultHeader,
            text: typeof toastBody === "object" ? toastBody.text : toastBody
        }
    });
}

function toCapipitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export {
    formatToCurrencyBRL,
    formatToDateBRL,
    showToast,
    toCapipitalize,
}