import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



// Define the TS type for the counter slice's state
export interface ComponentsGState {
    location: {
    country: string
    region: string
    district: string
    count: string
    ward: string
    places: string


    }

}

// Define the initial value for the slice state
const initialState: ComponentsGState = {
    location: {
    country: "Tanzania",
    region: "Dar es salaam",
    district: "Temeke",
    count: "Temeke",
    ward: "Kijichi",
    places: "Mtoni Kijichi"
    }

}

// Slices contain Redux reducer logic for updating state, and
// generate actions that can be dispatched to trigger those updates.
export const componentsGenaeralSlice = createSlice({
    name: 'g_components',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {

        ////////////////////////////////////jsettings//////////////////////////////////////

        setCountry: (state, action) => {
            state.location.country = action.payload
        },

        setRegion: (state, action) => {
            state.location.region = action.payload
        },

        setCount: (state, action) => {
            state.location.count = action.payload
        },


                setDistrict: (state, action) => {
            state.location.district = action.payload
        },

        setWard: (state, action) => {
            state.location.ward = action.payload
        },
                setPlaces: (state, action) => {
            state.location.places = action.payload
        },

      
    }
})

// Export the generated action creators for use in components
export const {
    setCountry,
    setRegion,
    setCount,
    setDistrict,
    setWard,
    setPlaces
} = componentsGenaeralSlice.actions

// Export the slice reducer for use in the store configuration
export default componentsGenaeralSlice.reducer