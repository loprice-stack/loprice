import { Mail } from '@tamagui/lucide-icons-2';
import Contents400_2 from 'components/Contents400_2';
import Contents400_2_flex from 'components/Contents400_2_flex';
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import ContactsTypeCard from 'components/conversations/contacts/ContactsTypeCard';
import LopriceContacts from 'components/conversations/contacts/LopriceContacts';
import Mails from 'components/conversations/contacts/Mails';
import MyContacts from 'components/conversations/contacts/MyContacts';
import PublicContacts from 'components/conversations/contacts/PublicContacts';
import { useAppDispatch, useAppSelector } from 'store/redux/store';


import {
  Separator,
  useWindowDimensions,
} from 'tamagui'



export default function Conversations() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.conversations.contacts.contact_type_openswitch)


  return (
    <Contents800_2_flexdirection>
      <Contents400_2>
        <ContactsTypeCard />
      </Contents400_2>
      <Separator vertical={width < 600 ? false : true} my={15} gap={'$8'} />
      <Contents400_2_flex>
        {contacts == "mycontacts"
          ? <MyContacts /> : contacts == "lopricecontacts"
            ? <LopriceContacts /> : contacts == "publiccontacts"
              ? <PublicContacts /> : <Mails />}

      </Contents400_2_flex>
    </Contents800_2_flexdirection>
  )
}
