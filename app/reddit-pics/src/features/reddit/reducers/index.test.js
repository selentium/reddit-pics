
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
});


test('addSubredditReducer', () => {
   let state = {
      subreddits: []
   };
   let newState = rootReducer(state, { type: "subreddits/addSubreddit", payload: "natureporn" });
   expect(newState.subreddits).toEqual(['natureporn']);
   state = {
      subreddits: []
   };
   newState = rootReducer(state, { type: "subreddits/addSubreddit", payload: "jojojojo" })
   expect(newState.subreddits).toEqual([]);
   state = {
      subreddits: ['natureporn']
   }
   newState = rootReducer(state, {type: "subreddits/addSubreddit", payload: 'natureporn'});
   expect(newState.subreddits).toEqual(['natureporn']);
});

test('removeSubredditReducer', () => {
   let state = {
      subreddits: []
   };
   let newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporn'});
   expect(newState.subreddits).toEqual([]);
   state = {
      subreddits: ['natureporn']
   };
   newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporn'});
   expect(newState.subreddits).toEqual([]);
   state = {
      subreddits: ['natureporn']
   };
   newState = rootReducer(state, {type: 'subreddits/removeSubreddit', payload: 'natureporncvcxcxcxcds'});
   expect(newState.subreddits).toEqual(['natureporn']); 

});

