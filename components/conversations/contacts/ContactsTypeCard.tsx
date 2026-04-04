import { Moon, Sun, Cloud, ChevronRight, Contact2, Phone, User, Mail, MessageSquare } from "@tamagui/lucide-icons-2";
import Account from "app/account";
import { changeContactType } from "app/conversations/conversationsSlice";
import { useAppDispatch } from "store/redux/store";
import { YGroup, ListItem, useWindowDimensions } from "tamagui";

export default function ContactsTypeCard() {


      const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();


    return (
        <YGroup
            self="center"
            borderWidth={1}
            borderColor="$borderColor"
            rounded="$4"
            overflow="hidden"
            width={ width < 600 ? width - 40 : 390}
            size="$4"
        >
            <YGroup.Item>
                <ListItem onPress={() => dispatch(changeContactType("mycontacts"))} gap="$3" icon={MessageSquare}  iconAfter={ChevronRight}>
                    My contacts
                </ListItem>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem onPress={() => dispatch(changeContactType("publiccontacts"))} gap="$3" icon={MessageSquare} iconAfter={ChevronRight}>
                    Public
                </ListItem>
            </YGroup.Item>
            <YGroup.Item>
                <ListItem onPress={() => dispatch(changeContactType("lopricecontacts"))} gap="$3" icon={MessageSquare} iconAfter={ChevronRight}>
                    Loprice
                </ListItem>
            </YGroup.Item>
                        <YGroup.Item>
                <ListItem onPress={() => dispatch(changeContactType("mails"))} gap="$3" icon={Mail} iconAfter={ChevronRight}>
                    Inmail
                </ListItem>
            </YGroup.Item>
        </YGroup>
    )
}
