import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {fetchSubreddit} from './RedditApiClient'
import {FETCH_THRESHOLD} from '../settings.js'


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


export const hasPrevPost = state => state.posts.currentIndex > 0;

export const hasNextPost = state => state.posts.currentIndex + 1 <= state.posts.posts.length  - 1;

export const needToFetch = state => state.posts.posts.length - 1  - state.posts.currentIndex <= FETCH_THRESHOLD;

export const currentPost = state => {
    if (state.posts.currentIndex == -1) {
        return null;
    }
    if (state.posts.posts.length - 1 >= state.posts.currentIndex) {
        return state.posts.posts[state.posts.currentIndex];
    }
    else {
        return null;
    }
};