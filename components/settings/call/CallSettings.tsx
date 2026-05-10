import { useRouter } from "expo-router";
import { useWindowDimensions, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector, _message } from "store/redux/store";
import { XStack, Separator, YGroup, ListItem, Text, Switch } from "tamagui";
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
                                <XStack gap="$2" >

                                    <Switch
                                        id={"hghghh"}
                                        //@ts-ignore
                                        transition="300ms"
                                        size={"$3"}
                                        defaultChecked={is_service_call_enabled}

                                        // use activeStyle to choose youra active color
                                        // default to $backgroundActive unless "unstyled" boolean prop is on
                                        activeStyle={{
                                            backgroundColor: '#3b9e78',
                                        }}
                                        onCheckedChange={(newstate) => dispatch(setServiceCall(newstate))}
                                    >
                                        <Switch.Thumb
                                            //@ts-ignore
                                            transition="quickest"
                                            activeStyle={{
                                                //@ts-ignore
                                                backgroundColor: '#fff',
                                                borderStartColor: '#fff'
                                            }}
                                        />
                                    </Switch>
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


