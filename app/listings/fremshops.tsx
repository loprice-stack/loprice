import AccountCard from "components/account/AccountCard";
import Contents400_2_flex from "components/Contents400_2_flex";
import Contents800 from "components/Contents800";
import ResidentialItemCard from "components/listings/ResidentialItemCard";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Avatar, Group, ScrollView, Separator, useWindowDimensions, YGroup } from "tamagui";

export default function FremShops() {

          const { width, height } = useWindowDimensions();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen options={{ title: "FremShops", headerShown: true }} />
            <Contents800>
                <ScrollView style={{ flex: 1, width:width < 600 ? width : 800, height: height, marginBottom: 40 }}>
                    <YGroup>
                        <YGroup.Item>
                            <Group orientation="horizontal">
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                            </Group>
                        </YGroup.Item>
                        <Separator />
                        <YGroup.Item>
                            <Group orientation="horizontal">
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                            </Group>
                        </YGroup.Item>
                        <Separator />
                        <YGroup.Item>
                            <Group orientation="horizontal">
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                                <Group.Item>
                                    <ResidentialItemCard />
                                </Group.Item>
                            </Group>
                        </YGroup.Item>
                    </YGroup>
                </ScrollView>
            </Contents800>
        </View>
    );
}