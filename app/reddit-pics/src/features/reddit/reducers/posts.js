import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {fetchSubreddit} from './RedditApiClient'
import {FETCH_THRESHOLD} from '../settings.js'


export const fetchPosts = createAsyncThunk(
    'fetchPosts',
    async (criteria, thunkApi) => {
        let subredditName, after;
        if (typeof criteria == 'object') {
            ({subredditName, after} = criteria);
        }
        else {
            subredditName = criteria;
        }
        const result = await fetchSubreddit(subredditName, after);
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
        },
        removeSubreddit: (state, action) => {
            state.posts = state.posts.filter(post => post.subreddit != action.payload);
            if (state.posts.length == 0) {
                state.currentIndex = -1;
            }
            if (state.currentIndex > state.posts.length - 1) {
                state.currentIndex = state.posts.length - 1;
            }
        }
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = state.posts.concat(action.payload.posts);
            state.cursors[action.payload.subreddit]  = {
                before: action.payload.before,
                after: action.payload.after
            } 
            if (state.currentIndex == -1) {
                state.currentIndex = 0;
            }
        }
    }
});


export const hasPrevPost = state => state.posts.currentIndex > 0;

export const hasNextPost = state => state.posts.currentIndex + 1 <= state.posts.posts.length  - 1;

export const needToFetch = state => state.posts.posts.length - 1  - state.posts.currentIndex <= FETCH_THRESHOLD;

export const canFetch = state => {
    if (state.posts.currentIndex == -1) {
        return true;
    }
    for (let k in state.posts.cursors) {
        if (state.posts.cursors[k].after) {
            return true;
        }
    }
    return false;
};

export const canFetchSubreddit = (state, subreddit) => {
    return !state.posts.cursors.hasOwnProperty(subreddit) || state.posts.cursors[subreddit].after != null;
};

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

export const normalizePost = post => {
    if (!post) return post
    post = {...post}
    post.subredditURL = 'https://www.reddit.com/r/' + post.subreddit
    post.permalink = 'https://www.reddit.com' + post.permalink
    post.authorURL = 'https://www.reddit.com/user/' + post.author + '/'
    return post
}


