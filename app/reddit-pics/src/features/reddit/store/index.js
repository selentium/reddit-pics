import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from '../reducers'




// We'll use redux-logger just as an example of adding another middleware
//import logger from 'redux-logger'




const middleware = [...getDefaultMiddleware()]


const  store = configureStore({
    reducer: rootReducer,
    middleware: middleware
});

export default store;