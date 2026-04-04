import AccountCard from "components/account/AccountCard";
import Contents400_2_flex from "components/Contents400_2_flex";
import Contents800 from "components/Contents800";
import ResidentialItemCard from "components/listings/ResidentialItemCard";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Avatar } from "tamagui";

export default function Rooms() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen options={{ title: "Rooms", headerShown: true }} />

            <Contents800>
                <Contents400_2_flex>
                    <ResidentialItemCard />
                </Contents400_2_flex>
            </Contents800>
        </View>
    );
}