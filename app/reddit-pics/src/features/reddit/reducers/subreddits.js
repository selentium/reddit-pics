import { createSlice} from '@reduxjs/toolkit'

import {AVAILABLE_SUBREDDITS, DEFAULT_SUBREDDITS} from '../settings.js'

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {subreddits: DEFAULT_SUBREDDITS, settingsOpen: false},
    reducers: {
        addSubreddit: (state, action) => {
            const sr = action.payload;
            if (AVAILABLE_SUBREDDITS.includes(sr) && !state.subreddits.includes(sr)) {
                state.subreddits.push(sr);
            }
        },
        removeSubreddit: (state, action) => {
            const sr = action.payload, index = state.subreddits.indexOf(sr);
            if (index != -1) {
                state.subreddits.splice(index, 1);
            }
        },
        openSettings: (state, action) => {
            state.settingsOpen = true;
        },
        closeSettings: (state, action) => {
            state.settingsOpen = false;
        }
    }
});

export const availableSubreddits = AVAILABLE_SUBREDDITS;

export const canRemoveSubreddit = (state) => state.subreddits.subreddits.length > 1;