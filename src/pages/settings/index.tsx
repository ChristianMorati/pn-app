import React from "react";
import ContainerGradient from "../../components/layout/container-gradient";
import { BasePage } from "../../components/layout/base-page";
import { Button } from "react-native";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { logOff } from "../../store/user/actions";
import { NavigationProps } from "../../router";

export default function SettingsScreen({ route, navigation }: NavigationProps) {
    const dispatch = useAppDispatch();
    return (
        <BasePage>
            <ContainerGradient>
                <Button title={"Sair do App"} onPress={() => dispatch(logOff())}></Button>
            </ContainerGradient>
        </BasePage>
    )
}
