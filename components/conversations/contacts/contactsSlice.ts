import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export type ContactsObject = {
    name: string
    jid: string
    subscription: "none" | "from" | "to" | "both"
    group: string

}

// Define the TS type for the counter slice's state
export interface ContactsState {
    roaster: {

        contacts: []
        groups: []
        contact_type_openswitch: string
        create_contact_d_open: boolean
        create_contact_group_d_open: boolean
        more_buttons_contact_menu_open: boolean
    },


}

// Define the initial value for the slice state
const initialState: ContactsState = {
    roaster: {

        contacts: [],
        groups: [],
        contact_type_openswitch: "My contacts",
        create_contact_d_open: false,
        create_contact_group_d_open: false,
        more_buttons_contact_menu_open: false
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

        setCreateContactDialogOpen: (state, action) => {
            state.roaster.create_contact_d_open = action.payload
            console.log("New state is " + state.roaster.create_contact_d_open)
        },

                setCreateContactGroupDialogOpen: (state, action) => {
            state.roaster.create_contact_group_d_open = action.payload
            console.log("New state is " + state.roaster.create_contact_group_d_open)
        },

        updateConctactList: (state, action) => {
            state.roaster.contacts = action.payload
            //console.log("New state is " + state.roaster.contacts)
        },

        pushConctactGroupList: (state, action) => {
            //@ts-ignore
            state.roaster.groups.push(action.payload)
            //console.log("New state is " + state.roaster.contacts)
        },
        updateConctactGroupList: (state, action) => {
            state.roaster.groups = action.payload
            //console.log("New state is " + state.roaster.contacts)
        },

        setMoreButtonsContactMenuOpen: (state, action) => {
            state.roaster.more_buttons_contact_menu_open = action.payload
            console.log("New state is " + state.roaster.more_buttons_contact_menu_open)
        },



    }
})

// Export the generated action creators for use in components
export const {
    changeContactType,
    setCreateContactDialogOpen,
    updateConctactList,
    setMoreButtonsContactMenuOpen,
    updateConctactGroupList,
    pushConctactGroupList,
    setCreateContactGroupDialogOpen
} = contactsSlice.actions

// Export the slice reducer for use in the store configuration
export default contactsSlice.reducer