import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CAMERA_FACING_MODE_USER } from 'utils/constants'


type CallState = "call" | "calling" | "incoming" | "hangup" | "hangupd" |  "closed"  |  "iddle" | "error"| "checking"  | "connecting" | "connected" | "accepted"
type RingerState = "ringing" | "iddle"
// Define the TS type for the counter slice's state
export interface CallsState {
    callstate: CallState
    ringer: RingerState
    videocallhandle: any,
    peerconnection: any
    localstream: any
    remotestream: any
    localsdp: any
    remotesdp: any
    caller: string
    callcontext: string

    callerror_d_open: boolean
    callerror_message: string
    camera_facing_mode: string
}

// Define the initial value for the slice state
const initialState: CallsState = {
    callstate: 'iddle',
    ringer: 'iddle',
    videocallhandle: null,
    peerconnection: null,
    localstream: null,
    remotestream: null,
    localsdp: null,
    remotesdp: null,
    caller: "",
    callcontext: "",

    callerror_d_open: false,
    callerror_message: "",
    camera_facing_mode: CAMERA_FACING_MODE_USER
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
            //console.log("New state callstate is: " + state.callstate)
        },

        setRingerState: (state, action) => {
            state.ringer = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setVideoCallHandle: (state, action) => {
            state.videocallhandle = action.payload
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

        setCaller: (state, action) => {
            state.caller = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setCallContext: (state, action) => {
            state.callcontext = action.payload
            //console.log("New state callcontext is: " + state.callcontext)
        },


        setCallErrorDialogOpen: (state, action) => {
            state.callerror_d_open = action.payload
        },

        setCallErrorMessage: (state, action) => {
            state.callerror_message = action.payload
        },

        
        setCameraFacingMode: (state, action) => {
            state.camera_facing_mode = action.payload
        },

    }
})

// Export the generated action creators for use in components
export const {
    setCallState,
    setRingerState,
    setVideoCallHandle,
    setPeerConnection,
    setLocalStream,
    setRemoteStream,
    setLocalSdp,
    setRemoteSdp,
    setCaller,
    setCallContext, 
    setCallErrorDialogOpen,
    setCallErrorMessage,
    setCameraFacingMode
} = callsSlice.actions

// Export the slice reducer for use in the store configuration
export default callsSlice.reducer