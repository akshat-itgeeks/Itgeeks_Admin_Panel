import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './Slices/loginSlice'

const Store = configureStore({
    reducer:{
        loginSlice: loginSlice,
    }
})


export default Store;