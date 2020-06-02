import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'




// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'

import {postSlice} from '../reducers'

//THIS IS WRONG!!!
const reducer = {
    posts: postSlice
}

const middleware = [...getDefaultMiddleware(), logger]


const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production'
});