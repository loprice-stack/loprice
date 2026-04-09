import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type CallState = "calling" | "incoming" | "hangup" | "iddle"
type RingerState = "ringing" | "iddle"
// Define the TS type for the counter slice's state
export interface CallsState {
    callstate: CallState
    ringer: RingerState
    callhandle: any,
    peerconnection: any
    localstream: any
    remotestream: any
    localsdp: any
    remotesdp: any




}

// Define the initial value for the slice state
const initialState: CallsState = {
    callstate: 'iddle',
    ringer: 'iddle',
    callhandle: null,
    peerconnection: null,
    localstream: null,
    remotestream: null,
    localsdp: null,
    remotesdp: null,


}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const callsSlice = createSlice({
    name: 'calls',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////calls//////////////////////////////////////

        setCallState: (state, action) => {
            state.callstate = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },
        setRingerState: (state, action) => {
            state.ringer = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setCallHandle: (state, action) => {
            state.callhandle = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setPeerConnection: (state, action) => {
            state.peerconnection = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },
        setLocalStream: (state, action) => {
            state.localstream = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setRemoteStream: (state, action) => {
            state.remotestream = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },
        setLocalSdp: (state, action) => {
            state.localsdp = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },
        setRemoteSdp: (state, action) => {
            state.remotesdp = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

    }
})

// Export the generated action creators for use in components
export const {
    setCallState,
    setRingerState,
    setCallHandle,
    setPeerConnection,
    setLocalStream,
    setRemoteStream,
    setLocalSdp,
    setRemoteSdp
} = callsSlice.actions

// Export the slice reducer for use in the store configuration
export default callsSlice.reducer