import { createSlice} from '@reduxjs/toolkit'

import {AVAILABLE_SUBREDDITS, DEFAULT_SUBREDDITS} from '../settings.js'

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