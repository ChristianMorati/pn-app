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

function  showToast(type: 'success' | 'error', text: string) {
    Toast.show({
        type,
        props: {
            header: type === 'error' ? 'Ops...' : 'Sucesso!',
            text
        }
    });
};

export {
    formatToCurrencyBRL,
    formatToDateBRL,
    showToast
}