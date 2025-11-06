import { configureStore } from '@reduxjs/toolkit'
import globleReducer from '../slice/reduxIGlobleReducer.js'

export const store = configureStore({
  reducer: { gloable: globleReducer },
});