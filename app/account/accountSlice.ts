import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type Gender = 'male' | 'female';

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

    },

    userinfo: {
        firstname: string
        secondname: string
        lastname: string
        fullname_d_open: boolean
        genderage_d_open: boolean
        gender: Gender
        age: number
    }

}

// Define the initial value for the slice state
const initialState: AccountState = {
    user: {
        user_token: undefined,
        user_id: "loprice@loprice.co.tz",
        email: "loprice@loprice.co.tz",
        image_url: "",
        user_type: "owner",
        token_type: "bearer",
        access_level: 1
    },

    userinfo: {
        firstname: "Loprice",
        secondname: "",
        lastname: "Limited",
        fullname_d_open: false,
        genderage_d_open: false,
        gender: "male",
        age: 0

    }

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
        },


        ////////////////////////////user info/////////////////////////////////////////

        updateFirstname: (state, action) => {
            state.userinfo.firstname = action.payload
        },
        updatesecondname: (state, action) => {
            state.userinfo.secondname = action.payload
        },
        updateLastname: (state, action) => {
            state.userinfo.lastname = action.payload
        },

        setFullnameDialogOpen: (state, action) => {
            state.userinfo.fullname_d_open = action.payload
        },
        setGenderAgeDialogOpen: (state, action) => {
            state.userinfo.genderage_d_open = action.payload
        },

        updateGender: (state, action) => {
            state.userinfo.gender = action.payload
        },
        updateAge: (state, action) => {
            state.userinfo.age = action.payload
        },

    }
})

// Export the generated action creators for use in components
export const {
    updateLoginStatus,
    updateFirstname,
    updatesecondname,
    updateLastname,
    setFullnameDialogOpen,
    setGenderAgeDialogOpen,
    updateGender,
    updateAge
} = accountSlice.actions

// Export the slice reducer for use in the store configuration
export default accountSlice.reducer