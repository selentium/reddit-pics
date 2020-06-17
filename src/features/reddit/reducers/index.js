import { combineReducers } from 'redux'
import {postsSlice} from './posts'
import {subredditsSlice} from './subreddits'

export default combineReducers({
    posts: postsSlice.reducer,
    subreddits: subredditsSlice.reducer
})


