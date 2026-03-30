import AccountCard from "components/AccountCard";
import Contents400_2_flex from "components/Contents400_2_flex";
import Contents800 from "components/Contents800";
import Contents800_2 from "components/Contents800_2";
import ResidentialAvailabilitySearchTab from "components/ResidentialAvailabilitySearchTab";

import ResidentialLocationContents from "components/ResidentialLocationContents";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import { Avatar } from "tamagui";

export default function ListingSearch() {

    const os = Platform.OS



    return (
        <View style={{ flex: 1, marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen options={{ title: "Search", headerShown: true }} />
            <Contents800_2>

                <ResidentialLocationContents />
                <ResidentialAvailabilitySearchTab />

            </Contents800_2>
        </View>
    );
}