import { configureStore } from '@reduxjs/toolkit'
import globleReducer from '../slice/globle-slice.js'

export const store = configureStore({
  reducer: { globle: globleReducer },
});