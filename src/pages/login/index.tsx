import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loginAsync } from '../../store/user/thunks';
import Input from '../../components/commons/trasaction/input';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../utils';
import { themeColors } from '../../theme/colors';

// Function to validate email
const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Function to validate password (minimum 6 characters)
const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

// Component to display tips/errors
interface TipProps {
    message: string;
}

const Tip: React.FC<TipProps> = ({ message }) => {
    return (
        <Text className="text-sm text-yellow-400 mt-1">
            {message}
        </Text>
    );
};

// Main Login component
const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            await dispatch(loginAsync({ username: email, password: password })).unwrap()
        } catch (e) {
            showToast('error', 'verifique as crendenciais e tente novamente!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className='text-slate-50 p-4'>
            <Text
                className="text-2xl mb-4"
                style={{ color: themeColors.color }}>
                Minha Conta
            </Text>
            <View className="mb-6">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    handleChange={handleEmailChange}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    handleChange={handlePasswordChange}
                />
                <View className='flex-row justify-center items-center py-2'>
                    <TouchableOpacity
                    className={`py-2 px-4 font-bold text-white rounded transition-colors duration-300 ${isSubmitting ? 'bg-gray-400' : 'bg-orange-400 hover:bg-orange-500'}`}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text className="text-white text-center font-bold text-lg">
                            {isSubmitting ? 'Enviando...' : 'Entrar'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Login;
