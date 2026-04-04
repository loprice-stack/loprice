import AccountCard from "components/account/AccountCard";
import Contents400_2_flex from "components/Contents400_2_flex";
import Contents800 from "components/Contents800";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Avatar } from "tamagui";

export default function RecordedStreams() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen options={{ title: "Uploads", headerShown: true }} />

            <Contents800>
                <Contents400_2_flex>
                    <AccountCard
                        //@ts-ignore
                        username={'Uploads'}>
                        <Avatar onClick={() => alert("Profile")} circular size="$10">
                            <Avatar.Image
                                aria-label="Cam"
                                src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                            />
                            <Avatar.Fallback bg="$blue10" />
                        </Avatar>
                    </AccountCard>
                </Contents400_2_flex>
            </Contents800>
        </View>
    );
}