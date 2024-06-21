import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import ContainerGradient from "../../components/layout/container-gradient";
import Login from "../login";
import SignUp from "../signup";
import { BasePage } from "../../components/layout/base-page";
import { NavigationProps } from "../../router";
import { Text } from "react-native";
import { View } from "react-native";

type LinkToggleLoginFormProps = {
    setShowSignup: (showSignup: boolean) => void,
    showSignup: boolean,
    linkText: string
}

function LinkToggleLoginForm({ setShowSignup, showSignup, linkText }: LinkToggleLoginFormProps) {
    return (
        <View className="flex justify-center items-center">
            <Text className="text-slate-400 font-bold font">ou</Text>
            <TouchableOpacity
                onPress={() => setShowSignup(!showSignup)}
                className="text-lg px-4"
            >
                <Text className="text-blue-400 font-semibold underline lowercase">{linkText}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function AuthScreen({ route, navigation }: NavigationProps) {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <BasePage style={{ justifyContent: "center" }}>
            {showSignup ? (
                <ContainerGradient>
                    <SignUp />
                    <LinkToggleLoginForm
                        setShowSignup={setShowSignup}
                        showSignup={showSignup}
                        linkText={"Já tenho uma conta"}
                    />
                </ContainerGradient>
            ) : (
                <ContainerGradient>
                    <Login />
                    <LinkToggleLoginForm
                        setShowSignup={setShowSignup}
                        showSignup={showSignup}
                        linkText={"Crie uma conta"}
                    />
                </ContainerGradient>
            )}
        </BasePage>
    )
}