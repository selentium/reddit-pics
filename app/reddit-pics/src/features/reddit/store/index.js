import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from '../reducers'


const middleware = [...getDefaultMiddleware()]


const  store = configureStore({
    reducer: rootReducer,
    middleware: middleware
});

export default store;