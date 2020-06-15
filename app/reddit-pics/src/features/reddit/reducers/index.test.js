
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

import rootReducer from './index.js'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)



test('nextReducer', () => {
   let state = {
      posts: {
         posts: [undefined],
         currentIndex: -1,
         cursors: {}
      }
   };
   let newState = rootReducer(state, { type: "posts/next", payload: undefined });
   expect(newState.posts.currentIndex).toBe(0);
   state = {
      posts: {
         posts: [undefined, undefined],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, { type: "posts/next", payload: undefined });
   expect(newState.posts.currentIndex).toBe(1);
   state = {
      posts: {
         posts: [undefined],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, { type: "posts/next", payload: undefined });
   expect(newState.posts.currentIndex).toBe(0);
});

test('prevReducer', () => {
   let state = {
      posts: {
         posts: [undefined],
         currentIndex: 0,
         cursors: {}
      }
   };
   let newState = rootReducer(state, { type: "posts/prev", payload: undefined });
   expect(newState.posts.currentIndex).toBe(0);

   state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   newState = rootReducer(state, { type: "posts/prev", payload: undefined });
   expect(newState.posts.currentIndex).toBe(-1);

   state = {
      posts: {
         posts: [undefined, undefined],
         currentIndex: 1,
         cursors: {}
      }
   };
   newState = rootReducer(state, { type: "posts/prev", payload: undefined });
   expect(newState.posts.currentIndex).toBe(0);

});

test('fetchPostsFulfilledReducer', () => {
   let state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   let actionPayload = {
      posts: ['post1', 'post2', 'post3'],
      before: "before",
      after: "after",
      subreddit: "subreddit"
   };
   let newState = rootReducer(state, { type: "fetchPosts/fulfilled", payload: actionPayload })
   let correctState = {
      posts: ['post1', 'post2', 'post3'],
      currentIndex: 0,
      cursors: {subreddit: {before: 'before', after: 'after'}}
   };
   expect(newState.posts).toEqual(correctState);
});




test('addSubredditReducer', () => {
   let state = {
      subreddits: {subreddits: [], settingsOpen: false}
   };
   let newState = rootReducer(state, { type: "subreddits/addSubreddit", payload: "natureporn" });
   expect(newState.subreddits.subreddits).toEqual(['natureporn']);
   state = {
      subreddits: {subreddits: [], settingsOpen: false}
   };
   newState = rootReducer(state, { type: "subreddits/addSubreddit", payload: "jojojojo" })
   expect(newState.subreddits.subreddits).toEqual([]);
   state = {
      subreddits: {subreddits: ['natureporn'], settingsOpen: false}
   }
   newState = rootReducer(state, {type: "subreddits/addSubreddit", payload: 'natureporn'});
   expect(newState.subreddits.subreddits).toEqual(['natureporn']);
});

test('removeSubredditReducer', () => {
   let state = {
      subreddits: {subreddits:[], settingsOpen: false}
   };
   let newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporn'});
   expect(newState.subreddits.subreddits).toEqual([]);
   state = {
      subreddits: {subreddits: ['natureporn'], settingsOpen: false}
   };
   newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporn'});
   expect(newState.subreddits.subreddits).toEqual([]);
   state = {
      subreddits: {subreddits: ['natureporn'], settingsOpen: false}
   };
   newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporncvcxcxcxcds'});
   expect(newState.subreddits.subreddits).toEqual(['natureporn']); 

});


test('postsRemoveSubredditReducer', () => {
   let state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   let newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   let correctNewState =  {
      posts: [],
      currentIndex: -1,
      cursors: {}   
   };
   expect(newState.posts).toEqual(correctNewState);

   state = {
      posts: {
         posts: [{subreddit: 'test'}],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   correctNewState = {
      posts: [],
      currentIndex: -1,
      cursors: {}
   };
   expect(newState.posts).toEqual(correctNewState);

   state = {
      posts: {
         posts: [{subreddit: 'test2'}],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   correctNewState = {
      posts: [{subreddit: 'test2'}],
      currentIndex: 0,
      cursors: {}
   };
   expect(newState.posts).toEqual(correctNewState);

   state = {
      posts: {
         posts: [{subreddit: 'test2'}, {subreddit: 'test'}],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   correctNewState =  {
      posts: [{subreddit: 'test2'}],
      currentIndex: 0,
      cursors: {}
   };
   expect(newState.posts).toEqual(correctNewState);

   state = {
      posts: {
         posts: [{subreddit: 'test2'}, {subreddit: 'test'}],
         currentIndex: 1,
         cursors: {}
      }
   };
   newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   correctNewState = {
      posts: [{subreddit: 'test2'}],
      currentIndex: 0,
      cursors: {}
   };
   expect(newState.posts).toEqual(correctNewState);

   state = {
      posts: {
         posts: [{subreddit: 'test'}],
         currentIndex: 0,
         cursors: {}
      }
   };
   newState = rootReducer(state, {type: 'posts/removeSubreddit', payload: 'test'});
   correctNewState =  {
      posts: [],
      currentIndex: -1,
      cursors: {}
   };
   expect(newState.posts).toEqual(correctNewState);

});

