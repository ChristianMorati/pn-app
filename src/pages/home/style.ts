import { Dimensions, StyleSheet } from "react-native";
import { themeColors } from "../../theme/colors";

const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
    container: {
        gap: 8,
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
