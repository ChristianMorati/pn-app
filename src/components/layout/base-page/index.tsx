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
}

export function BasePage({ children, style, nativeViewProps }: BasePageProps) {
    return (
        <View style={[{ justifyContent: "flex-start", paddingTop: 40, gap: 10, height: '100%', backgroundColor: themeColors.basePage, ...style }]} {...nativeViewProps}>
            <SafeAreaView>
                <ScrollView>
                    {children}
                    <ScapeFromBottomTab />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}