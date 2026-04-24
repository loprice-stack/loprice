


import Contents400_2 from 'components/Contents400_2';
import Contents400_2_flex from 'components/Contents400_2_flex';
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import ContactsTypeCard from 'components/conversations/contacts/ContactsTypeCard';
import GroupContacts from 'components/conversations/contacts/GroupContacts';
import LopriceContacts from 'components/conversations/contacts/LopriceContacts';
import Mails from 'components/conversations/contacts/Mails';
import MyContacts from 'components/conversations/contacts/MyContacts';
import PublicContacts from 'components/conversations/contacts/PublicContacts';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'store/redux/store';
import {
  Separator,
  useWindowDimensions,
  View,
} from 'tamagui'



export default function Conversations() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.roaster.contact_type_openswitch)


  return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Stack.Screen options={{ title: "Conversations", headerShown: true }} />
    <Contents800_2_flexdirection>
      <Contents400_2>
        <ContactsTypeCard />
      </Contents400_2>
      <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
      <Contents400_2_flex>
        {contacts == "My contacts"
          ? <MyContacts /> : contacts == " Loprice "
            ? <LopriceContacts /> : <GroupContacts /> }
      </Contents400_2_flex>
    </Contents800_2_flexdirection>
    </View>
  )
}
