import { Plus, RefreshCcw, Phone, MessageSquare, Delete, Mail } from "@tamagui/lucide-icons-2";
import { loadContacts } from "client/xmpp/xmppcontracts";
import { setCallState, setCaller } from "components/conversations/calls/callsSlice";
import { setCreateContactDialogOpen, ContactsObject } from "components/conversations/contacts/contactsSlice";
import { CreateContactDialogy } from "components/conversations/contacts/CreateContactDialogy";
import { setMessages, setMessagesTextSize } from "components/conversations/messages/messagesSlice";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { useWindowDimensions, View, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector, _message } from "store/redux/store";
import { XStack, Separator, YStack, Spinner, YGroup, ListItem, Avatar, Text, Slider } from "tamagui";
import { CALL_STATE_START_CALL } from "utils/constants";
import { getJidLocal } from "utils/utility";


export default function ChatSettings() {

    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const dispatch = useAppDispatch();
    const { settingstype } = useAppSelector(state => state.settings)
    const messageContext = useContext(_message)
    const { user_id, password, user_token } = useAppSelector(state => state.account.user)
    const { message_text_size } = useAppSelector(state => state.messages)
    //const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        //loadContacts(messageContext, user_id, user_token, password ,contact_type_openswitch)
    }, [])






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
                            title={"Text size"}
                            subTitle={"Chat messages text size"}
                        >
                            <Slider
                                cursor='pointer'
                                onValueChange={(value: number[]) => dispatch(setMessagesTextSize(value))} defaultValue={[message_text_size < 14 ? 14 : message_text_size]} style={{ marginTop: 18, marginBottom: 4 }} max={30} step={1} >
                                <Slider.Track>
                                    <Slider.TrackActive />
                                </Slider.Track>
                                <Slider.Thumb theme="accent" size={20} />
                            </Slider>
                        </ListItem>
                    </YGroup.Item>
                    <Separator gap={'$10'} />
                </YGroup>
            </ScrollView>
        </View>
    )
}


