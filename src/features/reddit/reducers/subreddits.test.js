import {subredditsSlice} from './subreddits'


test('addSubredditAction', () => {
   expect(subredditsSlice.actions.addSubreddit('test_subreddit')).toEqual({ type: "subreddits/addSubreddit", payload: "test_subreddit" });
});

test('removeSubredditAction', () => {
   expect(subredditsSlice.actions.removeSubreddit('test_subreddit')).toEqual({ type: "subreddits/removeSubreddit", payload: "test_subreddit" });
});


