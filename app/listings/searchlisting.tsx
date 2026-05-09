import Contents800_2 from "components/Contents800_2";
import ResidentialAvailabilitySearchTab from "components/listings/ResidentialAvailabilitySearchTab";

import { ResidentialTypeContents } from "components/listings/ResidentialTypeContents";

import { Stack } from "expo-router";
import { View } from "react-native";
import { ListItem, useWindowDimensions, XStack, YGroup } from "tamagui";
import { Search } from "@tamagui/lucide-icons-2";
import { LocationAddressContents } from "components/account/info/LocationAddressContents";
import { ResidentialLocationContents } from "components/ResidentialLocationContents";

export default function ListingSearch() {
    const { width, height } = useWindowDimensions();
    return (
        <View style={{ flex: 1, marginTop: 2, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen options={{ title: "Search", headerShown: true }} />
            <Contents800_2>
                <ResidentialLocationContents />
                <ResidentialTypeContents />
                <ResidentialAvailabilitySearchTab />
            </Contents800_2>
        </View>
    );
}