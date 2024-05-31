import { StyleSheet } from "react-native";
import { themeColors } from "../../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 30,
        paddingTop: 8,
        gap: 8,
        backgroundColor: themeColors.basePage
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    color: {
        color: '#fff'
    },
    containerColor: {
        backgroundColor: themeColors.primary
    },
    secondaryContainerColor: {
        backgroundColor: themeColors.secondary
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 100,
    },
});
