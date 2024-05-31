import { StyleSheet } from "react-native";
import { themeColors } from "../../../theme/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    label: {
        fontSize: 18,
        marginVertical: 8,
        color: themeColors.color,
    },
    radioGroup: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        textAlign: "center",
        width: '100%',
        padding: 10,
        fontSize: 20,
        borderBottomWidth: .5,
        marginBottom: 8,
        color: themeColors.color,
        borderBottomColor: themeColors.color,
    },
    radioText: {
        color: themeColors.color,
    },
    error: {
        color: themeColors.error,
        textAlign: 'center',
    },
});
