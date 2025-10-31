import { createSlice } from '@reduxjs/toolkit'

const globleSlice = createSlice({
    name: 'globleData',
    initialState: {
        authUser: null,
        isLoading: false,
        products: [],
    },

    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setProducts: (state, action) => {
            state.products = action.payload;
        },
    },
})

export const { setAuthUser, setIsLoading, setProducts } = globleSlice.actions;
export default globleSlice.reducer; 