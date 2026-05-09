import { createSlice } from '@reduxjs/toolkit'

// Define the TS type for the counter slice's state

export type FinObject = {
    count: number | undefined,
    first: string | undefined,
    last: string | undefined
}


export interface MessagesState {
    messages: []
    messages_isloading: boolean
    message_text_size: number
    mam_fin: FinObject

}

// Define the initial value for the slice state
const initialState: MessagesState = {

    messages: [],
    messages_isloading: false,
    message_text_size: 14,
    mam_fin: {
        count: 0,
        first: undefined,
        last: undefined

    }
}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////messages//////////////////////////////////////
        setMessages: (state, action) => {

            state.messages = action.payload
            //console.log("New state callstate is: " + state.messages)
        },

        pushMessage: (state, action) => {

            //@ts-ignore
            state.messages.push(action.payload)
            //console.log("New state is: " + state.messages)
        },

        setMessagesTextSize: (state, action) => {

            state.message_text_size = action.payload
            //console.log("New state callstate is: " + state.message_text_size)
        },

        setMessagesIsLoading: (state, action) => {

            state.messages_isloading = action.payload
            //console.log("New state callstate is: " + state.messages_isloading)
        },

        setMamFin: (state, action) => {

            state.mam_fin = action.payload
            //console.log("New state callstate is: " + state.mam_fin)
        },

    }
})

// Export the generated action creators for use in components
export const {
    setMessages,
    pushMessage,
    setMessagesTextSize,
    setMessagesIsLoading,
    setMamFin
} = messagesSlice.actions

// Export the slice reducer for use in the store configuration
export default messagesSlice.reducer