import { LinearGradient } from "expo-linear-gradient"
import { View } from "react-native"
import { themeColors } from "../../../theme/colors"

type ContainerGradientProps = {
    children?: React.ReactNode;
    invertColors?: boolean;
    tailwindRoundedClass?: string
}

export default function ContainerGradient({ children, tailwindRoundedClass, invertColors }: ContainerGradientProps) {
    return (
        <View className={`p-4 mx-1 overflow-hidden ${tailwindRoundedClass ? tailwindRoundedClass : 'rounded-md'}`}>
            <LinearGradient
                colors={[themeColors.primary, themeColors.secondary]}
                style={{
                    flex: 1,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
            />
            {children}
        </View>
    )
}