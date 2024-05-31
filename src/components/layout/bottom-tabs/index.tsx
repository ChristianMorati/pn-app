import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { themeColors } from "../../../theme/colors";
import { styles } from "../../../pages/home/style";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";


export default function BottomTabs() {
    const navigation = useNavigation()
    const iconSize = 30;
    const iconColor = themeColors.color;
    return (
        <View style={styles.containerColor} className="absolute rounded-lg justify-evenly items-center bottom-0 p-2 w-[95%] m-2 flex flex-row overflow-hidden">
            <LinearGradient
                colors={[themeColors.secondary, themeColors.primary]}
                style={[styles.background, { height: 120 }]}
            />
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Transaction")}>
                <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("AddBalance")}>
                <MaterialCommunityIcons name="bank-transfer-out" size={iconSize} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}