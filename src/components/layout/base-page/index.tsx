import React from "react";
import ScapeFromBottomTab from "../scape-from-bottom-tab";
import {
    ScrollView,
    SafeAreaView,
    View,
    ViewProps
} from "react-native";
import { ReactNode } from "react";
import { StyleProps } from "react-native-reanimated";
import { themeColors } from "../../../theme/colors";

interface BasePageProps extends ViewProps {
    children?: ReactNode;
    nativeViewProps?: ViewProps;
    style?: StyleProps
    usingBottomTabs?: boolean
}

export function BasePage({ children, style, nativeViewProps, usingBottomTabs }: BasePageProps) {
    return (
        <View style={[{ justifyContent: "flex-start", gap: 10, height: '100%', backgroundColor: themeColors.basePage, ...style }]} {...nativeViewProps}>
            <SafeAreaView>
                <ScrollView>
                    {children}
                    {usingBottomTabs && <ScapeFromBottomTab />}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}