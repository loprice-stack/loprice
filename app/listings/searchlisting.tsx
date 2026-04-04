import Contents800_2 from "components/Contents800_2";
import ResidentialAvailabilitySearchTab from "components/listings/ResidentialAvailabilitySearchTab";
import { ResidentialLocationContents } from "components/listings/ResidentialLocationContents";
import { ResidentialTypeContents } from "components/listings/ResidentialTypeContents";

import { Stack } from "expo-router";
import { View } from "react-native";

export default function ListingSearch() {

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