import { Icon, router, Stack } from 'expo-router';

import {
  Avatar,
  Label,
  View,
  XStack,
  Spinner,
  Text
} from 'tamagui'
import Contents800_2_flexdirection from 'components/Contents800_2_flexdirection';
import { _message, _session, _videohandle, useAppDispatch, useAppSelector } from 'store/redux/store';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Actions, Bubble, BubbleProps, GiftedChat, IMessage, InputToolbar, InputToolbarProps, MessageText, MessageTextProps, useColorScheme } from 'react-native-gifted-chat'
import { useHeaderHeight } from '@react-navigation/elements'
import { getCoversation, getMoreCoversation, sendChatMessage } from 'client/xmpp/xmppcontracts';
import { ArrowLeft, Phone, Plus, RefreshCcw } from '@tamagui/lucide-icons-2';
import { pushMessage, setMamFin, setMessages, setMessagesIsLoading } from 'components/conversations/messages/messagesSlice';
import { Platform } from 'react-native';
import React from 'react';
import { parseFin } from 'client/xmpp/xmlutilty';
import { isXmppNotNull } from 'client/janus/janus';
import { getXmppMiddleWhere } from 'client/xmpp/xmpp';


//StatusBar.setHidden(true)
export default function Message() {


  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const messageContext = useContext(_message)
  const dispatch = useAppDispatch();
  const { caller, remotesdp } = useAppSelector(state => state.calls)
  const { user_id, password, user_token } = useAppSelector(state => state.account.user)
  const { messages, messages_isloading, mam_fin, message_text_size } = useAppSelector(state => state.messages)
  const headerHeight = useHeaderHeight()
  //const middleware = getXmppMiddleWhere(messageContext.xmpp)

  useEffect(() => {
    if (mam_fin.last == undefined) {
      loadConversation();
    }

    //middleware.use((ctx, next) => {

    //  console.log(ctx)
    //   console.log("-----------------------middleware------------------------------")
    // });
  }, [])



  function loadConversation() {

      dispatch(setMessages([]))
      dispatch(setMessagesIsLoading(true))
      getCoversation(messageContext,user_id, user_token, password , caller, 100).then((response) => {
        dispatch(setMessagesIsLoading(false))
        parseFin(response).then((fn) => {
          dispatch(setMamFin(fn))
          console.log(fn)
          console.log("--------------------conversation---fin--------------------")
        }).catch((error) => {
          console.log(error)
          console.log("--------------------conversation--fi--error---------------------")
        })
      }).catch((error) => {
        dispatch(setMessagesIsLoading(false))
        console.log(error)
        console.log("---------------conversation----error-------------------")
      })
    
  }

  function loadMoreConversation() {
     
      let afterid = mam_fin.last !== undefined ? mam_fin.last : ""
      dispatch(setMessagesIsLoading(true))
      getMoreCoversation(messageContext, user_id, user_token, password , caller, 100, afterid).then((response) => {
        dispatch(setMessagesIsLoading(false))
        parseFin(response).then((fn) => {
          dispatch(setMamFin(fn))
          console.log(fn)
          console.log("--------------------conversation---fin--------------------")
        }).catch((error) => {
          console.log(error)
          console.log("--------------------conversation--fi--error---------------------")
        })
      }).catch((error) => {
        dispatch(setMessagesIsLoading(false))
        console.log(error)
        console.log("---------------conversation----error-------------------")
      })
    
  }

  function isCloseToTop({ contentOffset }) {
    return contentOffset.y <= 100; // 100px from top
  }

  const onSend = useCallback((messages = []) => {
    dispatch(pushMessage(messages[0]))
      //@ts-ignore
      sendChatMessage(messageContext, user_id, user_token, password , caller, messages[0].text).then((response) => {
        console.log(response)
        console.log("---------------------------message-----response-------------------------")
      })
    

  }, [])

  function onLongPressMessage(message) {
    console.log(message)
    console.log("--------------------------Message presed-----------------------")
  }

  const renderActions = (props) => (
    <Actions
      {...props}
      options={{
        ['Send Photo']: () => {
          console.log('Send Photo');
        },
        ['Cancel']: () => {
          console.log('Cancel');
        },
      }}
      icon={() => <Plus size={24} />}
      onSend={(args) => console.log(args)}
    />
  )

  const renderBubble = (props: BubbleProps<IMessage>) => (
    <Bubble
      {...props}
      // renderTime={() => <Text>Time</Text>}
      // renderTicks={() => <Text>Ticks</Text>}
      containerStyle={{
        left: {
          alignSelf: 'stretch', // Forces wrap to full container width  
          maxWidth: "100%",
        },
        right: {
          alignSelf: 'stretch', // Forces wrap to full container width  
          maxWidth: "100%",
        },
      }}
      wrapperStyle={{
        left: {
          alignSelf: 'stretch', // Forces wrap to full container width
          // backgroundColor: '#d2e6e1', // Custom color for sent messages

        },
        right: {
          alignSelf: 'stretch',
          backgroundColor: '#04AA6D', // Custom color for sent messages 

        },
      }}

    />
  )

  // Define the loading view
  const renderChatFooter = () => messages_isloading ? (
    <Spinner size='large' color='#21c485' />
  ) : (<XStack
    display={messages.length == 0 ? 'flex' : 'none'}
    self={'center'}
    p="$3" gap="$4" items="center">
    <Text >List is empty</Text>
    <RefreshCcw
      onPress={() => loadConversation()}
      cursor="pointer" color={'$accent6'} />
  </XStack>);

  const renderMessageText = (props: MessageTextProps<IMessage>) => (
    <MessageText
      {...props}
      textStyle={{
        //left: { color: 'red' },
        //right: { color: 'green' },
      }}
      linkStyle={{
        left: { color: 'orange' },
        right: { color: 'orange' },
      }}
      customTextStyle={{ 
        fontSize: message_text_size == 15
        ? 15 :message_text_size == 16 
        ? 16 :message_text_size == 17
        ? 17 :message_text_size == 18 
        ? 18 :message_text_size == 19 
        ? 19 :message_text_size == 20 
        ? 20 : message_text_size == 21 
        ? 21 : message_text_size == 22 
        ? 22 : message_text_size == 23 
        ? 23 : message_text_size == 24 
        ? 24 : message_text_size == 25 
        ? 25 : message_text_size == 26 
        ? 26 : message_text_size == 27 
        ? 27 : message_text_size == 28 
        ? 28 : message_text_size == 29 
        ? 29 : message_text_size == 30 
        ? 30: 14,
        lineHeight: 24 }}
    />
  )

  // These are React components (not render functions) so they can use hooks
  const RenderInputToolbar = React.memo((props: InputToolbarProps<IMessage>) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          //backgroundColor: isDark ? '#1a1a1a' : '#222B45',
          paddingTop: 6,
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    )
  })

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{
        title: caller, headerShown: true, header: () => {
          return (
            <View
              style={{ marginTop: Platform.OS == 'web' ? undefined : 20, height: 70, alignItems: 'stretch', alignContent: 'space-between' }}
              background={"#fff"}
            >
              <XStack
                style={{ height: 70, alignSelf: 'flex-start' }}
                background={"#fff"}
                p="$3" gap="$4" >
                <ArrowLeft
                  onPress={() => {
                    router.back()
                  }}
                  self={'center'}
                  cursor="pointer" color={'$accent6'} />
                <Avatar
                  self={'center'}
                  cursor="pointer"
                  circular size="$4">
                  <Avatar.Image src="http://picsum.photos/200/300" />
                  <Avatar.Fallback
                    //@ts-ignore
                    bc="red" />
                </Avatar>
                <Label
                  self={'center'}
                  htmlFor="name">{caller}</Label>
              </XStack>
              <XStack
                style={{ height: 70, position: 'absolute', alignSelf: 'flex-end', alignItems: 'center' }}
                background={"#fff"}
                p="$3" gap="$0" >
                <Phone
                  self={'center'}
                  marginEnd={30}
                  onPress={() => {
                    //@ts-ignore
                    router.navigate('/conversations/calls')
                  }}
                  cursor="pointer" color={'$accent6'} />
              </XStack>
            </View>

          )
        },
      }} />

      <Contents800_2_flexdirection>
        <View style={{ flex: 1, marginBottom: Platform.OS == 'web' ? undefined : 50 }}>
          <GiftedChat
            renderBubble={renderBubble}
            renderInputToolbar={RenderInputToolbar}
            messagesContainerStyle={{ backgroundColor: isDark ? '#1a1a1a' : '#ffff' }}
            isScrollToBottomEnabled={true}
            isInverted={false}
            messages={messages}
            onLongPressMessage={onLongPressMessage}
            renderChatFooter={renderChatFooter}
            renderMessageText={renderMessageText}
            listProps={{
              scrollEventThrottle: 400,
              onScroll: (ev) => {
                if (isCloseToTop(ev)) {
                  if (mam_fin.last !== undefined) {
                    loadMoreConversation();
                  }

                  console.log(ev)
                  console.log("------------------close--to--top-----------------------------")
                }
              }
            }}
            //@ts-ignore
            //renderActions={renderActions}
            //@ts-ignore
            onSend={_messages => onSend(_messages)}
            user={{
              _id: 1,
            }}
            keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
          />
        </View>
      </Contents800_2_flexdirection>
    </View>
  )
}


