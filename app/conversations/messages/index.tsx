import { Stack } from 'expo-router';

import {
  Avatar,
  Button,
  Card,
  H2,
  Label,
  Paragraph,
  useWindowDimensions,
  View,
  XStack,
  Image,
  YStack,
} from 'tamagui'

import { CALL_STATE_CALLING, CALL_STATE_HANGUP, CALL_STATE_INCOMMING, CALL_STATE_START_CALL, LOPRICE_JANUS_ICE_SERVER, LOPRICE_UI_CONTEXT_CALL } from 'utils/constants';
import { setCallContext, setCallErrorDialogOpen, setCallErrorMessage, setCallState, setRemoteSdp } from '../../../components/conversations/calls/callsSlice';
import VideoCallHandle from 'client/janus/videocall-plugin'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { _message, _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import { initializeVideoHandle, isLoggedIn, janussession } from 'client/janus/janus';

import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCRtpTransceiver,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCErrorEvent,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  permissions,
  registerGlobals,
  RTCView,
} from 'react-native-webrtc-web-shim';
import { setRequireLoginDialogOpen } from 'components/account/accountSlice';
import { useCallback, useContext, useEffect, useState } from 'react';
import RegisterCallIdAlertDialogy from 'components/account/RegisterCallIdAlertDialogy';
import CallErrorAlertDialogy from 'components/conversations/calls/CallErrorAlertDialogy';


import { GiftedChat } from 'react-native-gifted-chat'
import { useHeaderHeight } from '@react-navigation/elements'
import { sendChatMessage } from 'client/xmpp/xmppcontracts';
import { RefreshCcw } from '@tamagui/lucide-icons-2';




export default function Message() {

  const sessionContext = useContext(_session)
  const videoCallContext = useContext(_videohandle)
  const messageContext = useContext(_message)
  const { width, height } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { caller } = useAppSelector(state => state.calls)
  const { user_id } = useAppSelector(state => state.account.user)




  const [messages, setMessages] = useState([])

  // keyboardVerticalOffset = distance from screen top to GiftedChat container
  // useHeaderHeight() returns status bar + navigation header height
  const headerHeight = useHeaderHeight()

  useEffect(() => {

    setMessages([
      //@ts-ignore
      {
        _id: caller,
        text: 'Hello developer ' + caller,
        createdAt: new Date(),
        user: {
          _id: caller,
          name: 'John Doe',
          avatar: 'http://picsum.photos/200/300',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )

    console.log(messages)
    console.log("---------------------------message-----gifted-------------------------")
//@ts-ignore
    sendChatMessage(messageContext.xmpp, user_id, messages[0].text).then((response) => {
      console.log(response)
      console.log("---------------------------message-----response-------------------------")
    })






  }, [])



  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{  title: caller, headerShown: true, header: () => {
return (                       <YStack
background={'darkviolet'}
                             p="$3" gap="$4" items="center">
                            <XStack
                                p="$3" gap="$4" items="center">
                              
                                <RefreshCcw
                                    onPress={undefined}
                                    cursor="pointer" color={'$accent6'} />
                            </XStack>
                        </YStack>)
      },}} />
 
      <Contents800_2_flexdirection>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user_id,
      }}
      keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
    />
      </Contents800_2_flexdirection>

    </View>
  )







}


