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

interface BasePageProps extends ViewProps {
    children?: ReactNode;
    nativeViewProps?: ViewProps;
    style?: StyleProps
}

export function BasePage({ children, style, nativeViewProps }: BasePageProps) {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[{ flex: 1, justifyContent: "center", gap: 10, ...style }]} {...nativeViewProps}>
                    {children}
                </View>
                <ScapeFromBottomTab />
            </ScrollView>
        </SafeAreaView>
    );
}