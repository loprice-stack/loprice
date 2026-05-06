import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import accountReducer from 'components/account/accountSlice'
import { useDispatch, useSelector } from 'react-redux'
import conversationsReducer from 'components/conversations/conversationsSlice'
import contactsReducer from 'components/conversations/contacts/contactsSlice'
import callsReducer from 'components/conversations/calls/callsSlice'
import messagesReducer from 'components/conversations/messages/messagesSlice'
import settingsReducer from 'components/settings/settingsSlice'
import { createContext, useContext } from 'react'




export const store = configureStore({
  reducer: {
    account: accountReducer,
    conversations: conversationsReducer,
    contacts: contactsReducer,
    calls: callsReducer,
    messages: messagesReducer,
    settings: settingsReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'conversations/setConnection',
          'conversations/setSession',
          'calls/setVideoCallHandle',
          'calls/setPeerConnection',
          'calls/setLocalStream',
          'calls/setRemoteStream',
          'calls/setLocalSdp',
          'calls/setRemoteSdp'],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'conversations.setConnection',
          'conversations.setSession',
          'calls.setVideoCallHandle',
          'calls.setPeerConnection',
          'calls.setLocalStream',
          'calls.setRemoteStream',
          'calls.setLocalSdp',
          'calls.setRemoteSdp'
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'conversations.setConnection',
          'conversations.setSession',
          'calls.setVideoCallHandle',
          'calls.setPeerConnection',
          'calls.setLocalStream',
          'calls.setRemoteStream',
          'calls.setLocalSdp',
          'calls.setRemoteSdp'],
      },
    }),



})

const janodeContext = {
  connection: null,
  session: null

}

const videoContext = {
  videohandle: null,
  videohandleattached: false,
  peerconn: null

}

const messageContext = {
  xmpp: null,
  xmppopen: false,
  online: false

}



export const _session = createContext(janodeContext)
export const _videohandle = createContext(videoContext)
export const _message = createContext(messageContext)





// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore['dispatch']
// Define a reusable type describing thunk functions
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()