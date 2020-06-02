import fs from 'fs'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock-jest'

import { postsSlice, fetchPosts, subredditsSlice } from './index.js';
import rootReducer from './index.js'


const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

test('nextAction', () => {
   expect(postsSlice.actions.next()).toEqual({ type: "posts/next", payload: undefined });
});

test('prevAction', () => {
   expect(postsSlice.actions.prev()).toEqual({
      type: "posts/prev",
      payload: undefined
   });
});

test('fetchPostsAction', async () => {
   let listApiResponse = fs.readFileSync(__dirname + '/fixtures/reddit_list.json', 'utf8')
   fetchMock.getOnce('https://www.reddit.com/r/natureporn.json', {
      body: listApiResponse
   });
   const store = mockStore({ posts: { posts: [], cursors: {}, currentIndex: -1 } })
   await store.dispatch(fetchPosts('natureporn'));
   let actualActions = store.getActions();
   expect(actualActions[0].type).toBe('fetchPosts/pending');
   expect(actualActions[0].payload).toBe(undefined);
   expect(actualActions[1].type).toBe('fetchPosts/fulfilled');
   let fetchPayload = actualActions[1].payload;
   expect(fetchPayload.posts[0]).toEqual({
      "subreddit": "natureporn",
      "title": "Mountains and hills tea looks amazing in Vietnam 😍",
      "source_image": {
         "url": "https://preview.redd.it/2x1g512xfv151.jpg?auto=webp&amp;s=1a459a16077ead6ad873047580cc886ed1e1acc3",
         "width": 1280,
         "height": 800
      },
      "image_resolutions": [
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=a94b5c5c2054d9c891e78f7254ce28fd93a49d07",
            "width": 108,
            "height": 67
         },
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=531bf57b3a69abdb13d5c4a108326d27e27a88bd",
            "width": 216,
            "height": 135
         },
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=4a58b25cfba1c703854b1c77c2302276b6af28d1",
            "width": 320,
            "height": 200
         },
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=d7daf6f8087375c360346c411da8bede6ecf3a45",
            "width": 640,
            "height": 400
         },
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=634c9f1372c2a8d9fbf5ffbcc2adb9261e264fa0",
            "width": 960,
            "height": 600
         },
         {
            "url": "https://preview.redd.it/2x1g512xfv151.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=d29506f018fe604672de8b432e614aa36aa082ab",
            "width": 1080,
            "height": 675
         }
      ],
      "author": "priyankasrinet",
      "permalink": "/r/natureporn/comments/gtbjru/mountains_and_hills_tea_looks_amazing_in_vietnam/",
      "id": "gtbjru"
   });
   expect(fetchPayload.before).toBe(null);
   expect(fetchPayload.after).toBe('t3_gt66y5');
});

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

test('addSubredditAction', () => {
   expect(subredditsSlice.actions.addSubreddit('test_subreddit')).toEqual({ type: "subreddits/addSubreddit", payload: "test_subreddit" });
});

test('removeSubredditAction', () => {
   expect(subredditsSlice.actions.removeSubreddit('test_subreddit')).toEqual({ type: "subreddits/removeSubreddit", payload: "test_subreddit" });
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