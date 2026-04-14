import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define the TS type for the counter slice's state
export interface ContactsState {
    roaster: {
        contact_type_openswitch: string
    },


}

// Define the initial value for the slice state
const initialState: ContactsState = {
    roaster: {
     contact_type_openswitch: "mycontact",
    },


}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////contacts//////////////////////////////////////

        changeContactType: (state, action) => {
            state.roaster.contact_type_openswitch = action.payload
        },

      

    }
})

// Export the generated action creators for use in components
export const {
    changeContactType
} = contactsSlice.actions

// Export the slice reducer for use in the store configuration
export default contactsSlice.reducer