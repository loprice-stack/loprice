import { Phone } from "@tamagui/lucide-icons-2";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { useWindowDimensions, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector, _message } from "store/redux/store";
import { XStack, Separator, YGroup, ListItem, Text, Switch } from "tamagui";

export default function CallSettings() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { settingstype } = useAppSelector(state => state.settings)
    const messageContext = useContext(_message)
    const { user_id, password, user_token } = useAppSelector(state => state.account.user)
    const { caller } = useAppSelector(state => state.calls)
    //const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        //loadContacts(messageContext, user_id, user_token, password ,contact_type_openswitch)
    }, [])






    return (
        <View style={{ flex: 1, marginTop: width < 600 ? 2 : 40, height: height }}>
            <ScrollView style={{ width: width < 600 ? width : 400, height: height }}>
                <XStack gap={'$4'} style={{ display: width < 600 ? 'none' : 'flex', alignContent: 'center', alignItems: 'center', width: width, height: 50 }}>
                    <Text >{settingstype}</Text>
                </XStack>
                <Separator gap={'$10'} />
                <YGroup
                    self="center"
                    borderWidth={1}
                    borderColor="$borderColor"
                    rounded="$4"
                    overflow="hidden"
                    width={width < 600 ? width - 14 : 390}
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
                                        id="switch1"
                                        //@ts-ignore
                                        transition="300ms"
                                        size={"$3"}
                                        defaultChecked={true}
                                        // use activeStyle to choose youra active color
                                        // default to $backgroundActive unless "unstyled" boolean prop is on
                                        activeStyle={{
                                            backgroundColor: '$color6',
                                        }}
                                    >
                                        <Switch.Thumb
                                            //@ts-ignore
                                            transition="quickest" />
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


