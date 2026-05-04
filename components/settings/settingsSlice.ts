import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define the TS type for the counter slice's state
export interface SettingsState {
   settingstype: string


}

// Define the initial value for the slice state
const initialState: SettingsState = {
  settingstype: ""


}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////jsettings//////////////////////////////////////

        setSettingsType: (state, action) => {
            state.settingstype = action.payload
        },



    }
})

// Export the generated action creators for use in components
export const {
    setSettingsType
} = settingsSlice.actions

// Export the slice reducer for use in the store configuration
export default settingsSlice.reducer