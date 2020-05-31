import fs from 'fs'

import {fetchSubreddit} from './RedditApiClient'

jest.mock('cross-fetch')
import fetch from 'cross-fetch'
const {Response} = jest.requireActual('node-fetch')


test('fetchSubreddit', async () => {
    let listApiResponse = fs.readFileSync(__dirname + '/fixtures/reddit_list.json', 'utf8')
    fetch.mockReturnValue(Promise.resolve(new Response(listApiResponse)))
    let result = await fetchSubreddit('natureporn')
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith('https://www.reddit.com/r/natureporn.json')
    expect(result.posts[0]).toEqual({
        "subreddit":"natureporn",
        "title":"Mountains and hills tea looks amazing in Vietnam 😍",
        "source_image":{
           "url":"https://preview.redd.it/2x1g512xfv151.jpg?auto=webp&amp;s=1a459a16077ead6ad873047580cc886ed1e1acc3",
           "width":1280,
           "height":800
        },
        "image_resolutions":[
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=108&amp;crop=smart&amp;auto=webp&amp;s=a94b5c5c2054d9c891e78f7254ce28fd93a49d07",
              "width":108,
              "height":67
           },
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=216&amp;crop=smart&amp;auto=webp&amp;s=531bf57b3a69abdb13d5c4a108326d27e27a88bd",
              "width":216,
              "height":135
           },
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=320&amp;crop=smart&amp;auto=webp&amp;s=4a58b25cfba1c703854b1c77c2302276b6af28d1",
              "width":320,
              "height":200
           },
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=640&amp;crop=smart&amp;auto=webp&amp;s=d7daf6f8087375c360346c411da8bede6ecf3a45",
              "width":640,
              "height":400
           },
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=960&amp;crop=smart&amp;auto=webp&amp;s=634c9f1372c2a8d9fbf5ffbcc2adb9261e264fa0",
              "width":960,
              "height":600
           },
           {
              "url":"https://preview.redd.it/2x1g512xfv151.jpg?width=1080&amp;crop=smart&amp;auto=webp&amp;s=d29506f018fe604672de8b432e614aa36aa082ab",
              "width":1080,
              "height":675
           }
        ],
        "author":"priyankasrinet",
        "permalink":"/r/natureporn/comments/gtbjru/mountains_and_hills_tea_looks_amazing_in_vietnam/",
        "id":"gtbjru"
     })
     expect(result.before).toBe(null);
     expect(result.after).toBe('t3_gt66y5');
     expect(result.subreddit).toBe('natureporn');
});

