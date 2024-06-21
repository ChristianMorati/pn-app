import React from "react"
import { BasePage } from "../../components/layout/base-page"
import PixKeyValidation from "../../components/commons/trasaction"
import ContainerGradient from "../../components/layout/container-gradient"
import { NavigationProps } from "../../router"

export default function TransactionScreen({ route, navigation }: NavigationProps) {
    return (
        <BasePage>
            <ContainerGradient>
                <PixKeyValidation />
            </ContainerGradient>
        </BasePage>
    )
}