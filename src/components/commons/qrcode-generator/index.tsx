import React from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeSVG from 'react-native-qrcode-svg';

interface QRCodeGeneratorProps {
    value: string;
    size?: number; // Optional size prop
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value, size = 150 }) => {
    return (
        <View className='p-1 bg-white'>
            <QRCodeSVG value={value} size={size} backgroundColor="#ffffff" color="#000000" />
        </View>
    );
};

export default QRCodeGenerator;