import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type JanodeObject = null | undefined

// Define the TS type for the counter slice's state
export interface ConversationsState {
    janode: {
        connection: JanodeObject
        session: JanodeObject

    },


}

// Define the initial value for the slice state
const initialState: ConversationsState = {
    janode: {
        connection: null,
        session: null
    },



}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////janode connection//////////////////////////////////////

        setConnection: (state, action) => {
            state.janode.connection = action.payload
        },

        setSession: (state, action) => {
            state.janode.session = action.payload
        },


    }
})

// Export the generated action creators for use in components
export const {
    setConnection,
    setSession
} = conversationsSlice.actions

// Export the slice reducer for use in the store configuration
export default conversationsSlice.reducer