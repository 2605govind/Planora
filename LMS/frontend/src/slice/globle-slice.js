import { createSlice } from '@reduxjs/toolkit'

const globleSlice = createSlice({
    name: 'globle-data',
    initialState: {
        authUser: null,
        isLoading: false,
    },

    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

    },
})

export const { setAuthUser, setIsLoading } = globleSlice.actions;
export default globleSlice.reducer; 