import React from "react";
import QRCodeBilling from "../../components/commons/qrcode-billing";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import ContainerGradient from "../../components/layout/container-gradient";
import { BasePage } from "../../components/layout/base-page";
import { NavigationProps } from "../../router";

export default function QRCodeBillingScreen({ route, navigation }: NavigationProps) {
    const { account } = useAppSelector(store => store.account);
    return (
        <BasePage>
            <ContainerGradient>
                <QRCodeBilling
                    accountId={account.id}
                    pixKey={account.pixKeys[0].value}
                />
            </ContainerGradient>
        </BasePage>
    )
}
