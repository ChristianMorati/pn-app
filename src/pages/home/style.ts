import { StyleSheet } from "react-native";
import colors from "tailwindcss/colors"
import { themeColors } from "../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginTop: 30,
        paddingTop: 8,
        gap: 8,
        backgroundColor: themeColors.basePage
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
