import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


type Gender = 'male' | 'female';

// Define the TS type for the counter slice's state
export interface AccountState {
    user: {
        user_token: string | undefined
        user_id: string
        password: string
        email: string
        image_url: string
        profileimage_d_open: boolean
        profileimage_a_d_open: boolean
        user_type: string
        token_type: string
        access_level: number


    },

    userinfo: {
        firstname: string
        secondname: string
        lastname: string
        fullname_d_open: boolean
        gender: Gender
        age: number
        genderage_d_open: boolean
        nationality: string
        nationality_d_open: boolean
        tin: string
        tin_d_open: boolean
        contactp: string
        contactp_d_open: boolean
        address: string
        address_d_open: boolean
        acname: string
        acnumber: string
        paymentacc_d_open: boolean
    }

}

// Define the initial value for the slice state
const initialState: AccountState = {
    user: {
        user_token: undefined,
        password: "",
        user_id: "loprice@loprice.co.tz",
        email: "loprice@loprice.co.tz",
        image_url: "https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80",
        profileimage_d_open: false,
        profileimage_a_d_open: false,
        user_type: "owner",
        token_type: "bearer",
        access_level: 1,

    },

    userinfo: {
        //full name
        firstname: "Loprice",
        secondname: "",
        lastname: "Limited",
        fullname_d_open: false,
        //gender and age
        gender: "male",
        age: 0,
        genderage_d_open: false,
        //nationality
        nationality: "",
        nationality_d_open: false,
        //tin
        tin: "",
        tin_d_open: false,
        //contactp
        contactp: "",
        contactp_d_open: false,
        //address
        address: "",
        address_d_open: false,
        //payments
        acname: "",
        acnumber: "",
        paymentacc_d_open: false,

    }

}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////user//////////////////////////////////////

        updateLoginStatus: (state, action) => {
            state.user = action.payload
            //console.log("New state is: " + state.user.user_jid)
        },

        setProfilePhotoEditDialogOpen: (state, action) => {
            state.user.profileimage_d_open = action.payload
        },

        setProfilePhotoAlertDialogOpen: (state, action) => {
            state.user.profileimage_a_d_open = action.payload
        },



        ////////////////////////////user info/////////////////////////////////////////

        //full name
        updateFirstname: (state, action) => {
            state.userinfo.firstname = action.payload
            console.log(state.userinfo.firstname)
        },
        updatesecondname: (state, action) => {
            state.userinfo.secondname = action.payload
            console.log(state.userinfo.secondname)
        },
        updateLastname: (state, action) => {
            state.userinfo.lastname = action.payload
            console.log(state.userinfo.lastname)
        },
        setFullnameDialogOpen: (state, action) => {
            state.userinfo.fullname_d_open = action.payload
        },

        //gender and age
        updateGender: (state, action) => {
            state.userinfo.gender = action.payload
            console.log(state.userinfo.gender)
        },
        updateAge: (state, action) => {
            state.userinfo.age = action.payload
            console.log(state.userinfo.age)
        },
        setGenderAgeDialogOpen: (state, action) => {
            state.userinfo.genderage_d_open = action.payload
        },


        //nationality
        updateNationality: (state, action) => {
            state.userinfo.nationality = action.payload
            console.log(state.userinfo.nationality)
        },
        setNationalityDialogOpen: (state, action) => {
            state.userinfo.nationality_d_open = action.payload
        },


        //tin
        updateTin: (state, action) => {
            state.userinfo.tin = action.payload
            console.log(state.userinfo.tin)
        },
        setTinDialogOpen: (state, action) => {
            state.userinfo.tin_d_open = action.payload
        },

        //contact phone
        updateContactP: (state, action) => {
            state.userinfo.contactp = action.payload
            console.log(state.userinfo.contactp)
        },
        setContactPDialogOpen: (state, action) => {
            state.userinfo.contactp_d_open = action.payload
        },


        //address
        updateAddress: (state, action) => {
            state.userinfo.address = action.payload
            console.log(state.userinfo.address)
        },
        setAddressDialogOpen: (state, action) => {
            state.userinfo.address_d_open = action.payload
        },


        //paymentsaccount
        updateAccountName: (state, action) => {
            state.userinfo.acname = action.payload
            console.log(state.userinfo.acname)
        },
        updateAccountNumber: (state, action) => {
            state.userinfo.acnumber = action.payload
            console.log(state.userinfo.acnumber)
        },
        setPaymentsAccountDialogOpen: (state, action) => {
            state.userinfo.paymentacc_d_open = action.payload
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
    updateGender,
    updateAge,
    setGenderAgeDialogOpen,
    updateNationality,
    setNationalityDialogOpen,
    updateTin,
    setTinDialogOpen,
    updateContactP,
    setContactPDialogOpen,
    updateAddress,
    setAddressDialogOpen,
    updateAccountName,
    updateAccountNumber,
    setPaymentsAccountDialogOpen,
    setProfilePhotoEditDialogOpen,
    setProfilePhotoAlertDialogOpen
} = accountSlice.actions

// Export the slice reducer for use in the store configuration
export default accountSlice.reducer