import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define the TS type for the counter slice's state
export interface AccountState {
    user: {
        user_token: string | undefined
        user_id: string
        email: string
        image_url: string
        user_type: string
        token_type: string
        access_level: number

    }

}

// Define the initial value for the slice state
const initialState: AccountState = {
    user: {
        user_token: undefined,
        user_id: "response.data.user_id",
        email: "response.data.email",
        image_url: "response.data.image_url",
        user_type: "response.data.user_type",
        token_type: "response.data.token_type",
        access_level: 0
    },

}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        updateLoginStatus: (state, action) => {
            state.user = action.payload
            //console.log("New state is: " + state.user.user_jid)
        }
    }
})

// Export the generated action creators for use in components
export const { updateLoginStatus } = accountSlice.actions

// Export the slice reducer for use in the store configuration
export default accountSlice.reducer