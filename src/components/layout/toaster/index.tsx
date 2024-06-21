// App.jsx
import { Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

const toastConfig = {
    success: ({ props }) => (
        <View className='w-full absolute top-0 p-4 border-green-400 bg-slate-950 border-y-2 border-spacing-1'>
            <Text style={{ fontSize: 18 }} className='text-white font-bold'>{props.header}</Text>
            <Text style={{ fontSize: 16 }} className='text-white font-semibold'>{props.text}</Text>
        </View>
    ),

    error: ({ props }) => (
        <View className='w-full absolute top-0 p-4 border-red-400 bg-slate-950 border-x-2 border-spacing-1'>
            <Text style={{ fontSize: 18 }} className='text-white font-bold'>{props.header}</Text>
            <Text style={{ fontSize: 16 }} className='text-white font-semibold'>{props.text}</Text>
        </View>
    ),
};

export function ToasterDark() {
    return (
        <>
            <Toast config={toastConfig} />
        </>
    );
}