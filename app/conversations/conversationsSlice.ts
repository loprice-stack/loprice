import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define the TS type for the counter slice's state
export interface ConversationsState {
    contacts: {
        contact_type_openswitch: string

    },


}

// Define the initial value for the slice state
const initialState: ConversationsState = {
    contacts: {
     contact_type_openswitch: "mycontact",

    },


}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////contacts//////////////////////////////////////

        changeContactType: (state, action) => {
            state.contacts.contact_type_openswitch = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

      

    }
})

// Export the generated action creators for use in components
export const {
    changeContactType
} = conversationsSlice.actions

// Export the slice reducer for use in the store configuration
export default conversationsSlice.reducer