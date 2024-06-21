import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { signUpAsync } from '../../store/user/thunks';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/commons/trasaction/input';

// Função para validar email
const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Função para validar senha (mínimo de 6 caracteres)
const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

// Função para validar CPF (formato XXX.XXX.XXX-XX ou apenas números)
const validateCPF = (cpf: string): boolean => {
    const re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return re.test(cpf);
};

// Função para validar nome completo (mínimo de 6 caracteres e sem números)
const validateName = (name: string): boolean => {
    const re = /^[A-Za-z\s]{6,}$/;
    return re.test(name);
};

// Componente principal
const SignUp: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        email: null,
        password: null,
        cpf: null,
        name: null,
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    // Validações em tempo real
    useEffect(() => {
        if (step === 1) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: validateEmail(email) ? null : 'Deve conter um email válido.',
                password: validatePassword(password) ? null : 'A senha deve ter no mínimo 6 caracteres.',
            }));
        } else if (step === 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: validateName(name) ? null : 'O nome deve ter no mínimo 6 caracteres e não pode conter números.',
                cpf: validateCPF(cpf) ? null : 'Por favor, insira um CPF válido.',
            }));
        }
    }, [email, password, name, cpf, step]);

    const handleEmailChange = (text: string) => {
        setEmail(text);
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
    };

    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handleCpfChange = (text: string) => {
        setCpf(text);
    };

    const handleNextStep = () => {
        if (!errors.email && !errors.password) {
            setStep(2);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const cleanedCpf = cpf.replace(/\D/g, '');

        dispatch(signUpAsync({ username: email, password, name, cpf: cleanedCpf })).then((data) => {
        }).catch((e) => {
            
        });

        setIsSubmitting(false);
    };

    interface TipProps {
        message: string;
    }

    const Tip: React.FC<TipProps> = ({ message }) => {
        return (
            <Text style={styles.tip}>
                {message}
            </Text>
        );
    };

    return (
        <View>
            <Text style={styles.title}>Cadastro</Text>
            <View style={styles.progressContainer}>
                <View style={styles.stepContainer}>
                    <View style={[styles.step, step === 1 ? styles.activeStep : styles.inactiveStep]}>
                        <Text style={styles.stepText}>1</Text>
                    </View>
                    <View style={[styles.progressLine, step >= 2 ? styles.activeLine : styles.inactiveLine]}></View>
                </View>
                <View style={styles.stepContainer}>
                    <View style={[styles.progressLine, step >= 2 ? styles.activeLine : styles.inactiveLine]}></View>
                    <View style={[styles.step, step === 2 ? styles.activeStep : styles.inactiveStep]}>
                        <Text style={styles.stepText}>2</Text>
                    </View>
                </View>
            </View>
            {step === 1 && (
                <View style={styles.inputContainer}>
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
                        onPress={handleNextStep}
                        disabled={!!errors.email || !!errors.password}
                        style={[
                            styles.button,
                            (errors.email || errors.password) ? styles.buttonDisabled : styles.buttonEnabled,
                        ]}
                    >
                        <Text style={styles.buttonText}>Próximo</Text>
                    </TouchableOpacity>
                </View>
            )}
            {step === 2 && (
                <View style={styles.inputContainer}>
                    {errors.name && <Tip message={errors.name} />}
                    <Input
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        handleChange={handleNameChange}
                    />
                    {errors.cpf && <Tip message={errors.cpf} />}
                    <Input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        handleChange={handleCpfChange}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setStep(1)}
                            style={[styles.button, styles.backButton]}
                        >
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={!!errors.name || !!errors.cpf || !name || !cpf || isSubmitting}
                            style={[
                                styles.button,
                                (!!errors.name || !!errors.cpf || !name || !cpf || isSubmitting) ? styles.buttonDisabled : styles.buttonEnabled,
                            ]}
                        >
                            <Text style={styles.buttonText}>{isSubmitting ? 'Enviando...' : 'Cadastrar'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {success && <View style={styles.successContainer}><Text style={styles.successText}>{success}</Text></View>}
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        marginBottom: 16,
        color: '#FFFFFF',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
    },
    step: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#64748B',
    },
    activeStep: {
        backgroundColor: '#F97316',
    },
    inactiveStep: {
        backgroundColor: '#64748B',
    },
    stepText: {
        color: '#FFFFFF',
    },
    progressLine: {
        height: 2,
        flexGrow: 1,
        backgroundColor: '#64748B',
    },
    activeLine: {
        backgroundColor: '#F97316',
    },
    inactiveLine: {
        backgroundColor: '#64748B',
    },
    inputContainer: {
        marginBottom: 24,
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginTop: 16,
    },
    buttonEnabled: {
        backgroundColor: '#F97316',
    },
    buttonDisabled: {
        backgroundColor: '#64748B',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backButton: {
        backgroundColor: '#64748B',
        marginRight: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    successContainer: {
        padding: 8,
        backgroundColor: '#10B981',
        marginTop: 8,
    },
    successText: {
        color: '#D1FAE5',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tip: {
        fontSize: 12,
        color: '#FBBF24',
        marginTop: 4,
    },
});

export default SignUp;
