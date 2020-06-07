import fs from 'fs'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock-jest'

import {postsSlice, fetchPosts, hasPrevPost, hasNextPost, needToFetch, currentPost} from './posts'



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



test('hasPrevPost', () => {
   let state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   expect(hasPrevPost(state)).toBe(false);
   state = {
      posts: {
         posts: ['post1'],
         currentIndex: 0,
         cursors: {}
      }
   }; 
   expect(hasPrevPost(state)).toBe(false);
   state = {
      posts: {
         posts: ['post1', 'post2'],
         currentIndex: 0,
         cursors: {}
      }
   }; 
   expect(hasPrevPost(state)).toBe(false);
   state = {
      posts: {
         posts: ['post1', 'post2'],
         currentIndex: 1,
         cursors: {}
      }
   }; 
   expect(hasPrevPost(state)).toBe(true);
});

test('hasNextPost', () => {
   let state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   expect(hasNextPost(state)).toBe(false);
   state = {
      posts: {
         posts: ['post1'],
         currentIndex: 0,
         cursors: {}
      }
   };
   expect(hasNextPost(state)).toBe(false);
   state = {
      posts: {
         posts: ['post1', 'post2'],
         currentIndex: 0,
         cursors: {}
      }
   };
   expect(hasNextPost(state)).toBe(true);
   state = {
      posts: {
         posts: ['post1', 'post2'],
         currentIndex: 1,
         cursors: {}
      }
   };
   expect(hasNextPost(state)).toBe(false);
});

test('currentPost', () => {
   let state = {
      posts: {
         posts: [],
         currentIndex: -1,
         cursors: {}
      }
   };
   expect(currentPost(state)).toBe(null);
   state = {
      posts: {
         posts: ['post1'],
         currentIndex: 0,
         cursors: {}
      }
   };
   expect(currentPost(state)).toBe('post1');
   state = {
      posts: {
         posts: ['post1'],
         currentIndex: 2,
         cursors: {}
      }
   };
   expect(currentPost(state)).toBe(null);
});