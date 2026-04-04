//import { connection } from 'client/janus/janode';
import AccountCard from 'components/account/AccountCard';
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { Stack } from 'expo-router';
import { useAppDispatch, useAppSelector } from 'store/redux/store';


import {
  Button,
  Separator,
  useWindowDimensions,
  View,
} from 'tamagui'


//import Janode from 'janode';
//const { Logger } = Janode;
//import EchoTestPlugin from 'janode/src/plugins/echotest-plugin';



export default function Calls() {

  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.conversations.contacts.contact_type_openswitch)

 // async function initializeJanus() {


 //   const session = await connection.create();

    // Attach to a plugin using the plugin descriptor
 //   const echoHandle = await session.attach(EchoTestPlugin)

    // Janode exports "EVENT" property with core events
 //   echoHandle.on(Janode.EVENT.HANDLE_WEBRTCUP, _ => Logger.info('webrtcup event'));
 //   echoHandle.on(Janode.EVENT.HANDLE_MEDIA, evtdata => Logger.info('media event', evtdata));
 //   echoHandle.on(Janode.EVENT.HANDLE_SLOWLINK, evtdata => Logger.info('slowlink event', evtdata));
 //   echoHandle.on(Janode.EVENT.HANDLE_HANGUP, evtdata => Logger.info('hangup event', evtdata));
 //   echoHandle.on(Janode.EVENT.HANDLE_DETACHED, evtdata => Logger.info('detached event', evtdata));







 // }






  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "Calls", headerShown: true }} />
      <Contents800_2_flexdirection>
        <Button onPress={() => console.log('good')}>Janode </Button>
      </Contents800_2_flexdirection>
    </View>
  )
}
