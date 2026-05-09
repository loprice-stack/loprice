import { Phone } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useWindowDimensions, View, ScrollView, Switch } from "react-native";
import { useAppDispatch, useAppSelector, _message } from "store/redux/store";
import { XStack, Separator, YGroup, ListItem, Text } from "tamagui";
import { setServiceCall } from "../settingsSlice";

export default function CallSettings() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { settingstype, is_service_call_enabled } = useAppSelector(state => state.settings)


    return (
        <View style={{ flex: 1, marginTop: width < 600 ? 2 : 40, height: height }}>
            <ScrollView style={{ width: width < 600 ? width : 400, height: height }}>
                <XStack style={{ display: width < 600 ? 'none' : 'flex', alignContent: 'center', alignItems: 'center', width: width, height: 50, margin: 10 }}>
                    <Text >{settingstype}</Text>
                </XStack>
                <Separator gap={'$10'} />
                <YGroup
                    self="center"
                    borderWidth={1}
                    borderColor="$borderColor"
                    rounded="$4"
                    overflow="hidden"
                    width={width < 600 ? width - 14 : "99.2%"}
                    size="$5"
                >
                    <YGroup.Item>
                        <ListItem
                            gap="$3"
                            title={"Services call"}
                            subTitle={"Enable Loprice call services"}
                            iconAfter={
                                <XStack gap="$3" >
                                    <Switch
                                        trackColor={{ false: '#a09c9c', true: '#4ecfba' }}
                                        thumbColor={is_service_call_enabled ? '#fff' : '#fff'}
                                        ios_backgroundColor="#3e3e3e"
                                        //@ts-ignore
                                        onValueChange={(value) => dispatch(setServiceCall(value))}
                                        value={is_service_call_enabled}
                                                      cursor='pointer'
                                    />
                                </XStack>
                            }
                        />
                    </YGroup.Item>
                    <Separator gap={'$10'} />
                </YGroup>
            </ScrollView>
        </View>
    )
}


