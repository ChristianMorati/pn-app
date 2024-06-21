import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loginAsync } from '../../store/user/thunks';
import Input from '../../components/commons/trasaction/input';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        email: null,
        password: null,
        form: null,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | null>(null);
    const navigation = useNavigation();

    // Real-time validations
    useEffect(() => {
        setErrors({
            email: validateEmail(email) ? null : 'Deve conter um email válido.',
            password: validatePassword(password) ? null : 'A senha deve ter no mínimo 6 caracteres.',
            form: null, // Clear form error when editing fields
        });
    }, [email, password]);

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        dispatch(loginAsync({ username: email, password: password })).then((data) => {
        }).catch((e) => {
            
        });

        setIsSubmitting(false);
    };

    return (
        <View className='text-slate-50 p-4'>
            <Text className="text-2xl mb-4">Minha Conta</Text>
            <View className="mb-6">
                {errors.email && <Tip message={errors.email} />}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    handleChange={handleEmailChange}
                />
                {errors.password && <Tip message={errors.password} />}
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    handleChange={handlePasswordChange}
                />
                <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!!errors.email || !!errors.password || isSubmitting}
                    className={`py-2 px-4 mt-4 font-bold text-white rounded transition-colors duration-300 ${!!errors.email || !!errors.password || isSubmitting ? 'bg-gray-400' : 'bg-orange-400 hover:bg-orange-500'}`}
                >
                    <Text className="text-white">
                        {isSubmitting ? 'Enviando...' : 'Entrar'}
                    </Text>
                </TouchableOpacity>
                {errors.form && <Tip message={errors.form} />}
            </View>
            {success && <View className="p-2 bg-green-600 font-bold text-green-50 mt-2"><Text className="text-white">{success}</Text></View>}
        </View>
    );
};

export default Login;
