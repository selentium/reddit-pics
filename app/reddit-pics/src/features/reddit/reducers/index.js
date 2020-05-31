import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchPosts = createAsyncThunk(
    'fetchPosts',
    async (subredditName, thunkApi) => {
        const result = await fetchSubreddit(subredditName);
        return result;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {posts: [], cursors: {}, currentIndex: -1},
    reducers: {
        next: (state, action) => {
            ++state.currentIndex;
        },
        prev: (state, action) => {
            --state.currentIndex;
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
