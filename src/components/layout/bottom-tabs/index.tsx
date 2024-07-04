import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { themeColors } from "../../../theme/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from "@react-navigation/native";

export default function BottomTabs() {
    const navigation: any = useNavigation();
    const iconSize = 22;
    const iconColor = themeColors.color;
    return (
        <View
            style={{ backgroundColor: themeColors.primary }}
            className="absolute justify-evenly items-center bottom-0 py-4 p-2 w-[100%] flex flex-row overflow-hidden"
        >
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <FontAwesome6 name="house" size={iconSize} color={iconColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Transaction")}>
                <FontAwesome6 name="money-bill-transfer" size={iconSize} color={iconColor} />
            </TouchableOpacity>
        </View>
    );
}