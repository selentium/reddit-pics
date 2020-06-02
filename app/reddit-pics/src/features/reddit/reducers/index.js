import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import {fetchSubreddit} from './RedditApiClient'
import {AVAILABLE_SUBREDDITS, DEFAULT_SUBREDDITS} from '../settings.js'


export const fetchPosts = createAsyncThunk(
    'fetchPosts',
    async (subredditName, thunkApi) => {
        const result = await fetchSubreddit(subredditName);
        return result;
    }
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {posts: [], cursors: {}, currentIndex: -1},
    reducers: {
        next: (state, action) => {
            if ((state.currentIndex + 1) <= (state.posts.length  - 1)) {
                ++state.currentIndex;
            }
        },
        prev: (state, action) => {
            if (state.currentIndex > 0) {
                --state.currentIndex;
            }
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.push(action.payload.posts);
            state.cursors[action.payload.subreddit]  = {
                before: action.payload.before,
                after: action.payload.after
            }
        }
    }
});

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: DEFAULT_SUBREDDITS,
    reducers: {
        addSubreddit: (state, action) => {
            const sr = action.payload;
            if (AVAILABLE_SUBREDDITS.includes(sr) && !state.includes(sr)) {
                state.push(sr);
            }
        },
        removeSubreddit: (state, action) => {
            const sr = action.payload, index = state.indexOf(sr);
            if (index != -1) {
                state.splice(index, 1);
            }
        }
    }
});

export default combineReducers({
    posts: postsSlice.reducer,
    subreddits: subredditsSlice.reducer
})


