//import fetch from 'cross-fetch';
import 'cross-fetch/polyfill'


export const fetchSubreddit  = async (subredditName, after) => {
    let apiResponse;
    if (after) {
        apiResponse = await fetch(`https://www.reddit.com/r/${subredditName}.json?after=${after}`)
    }
    else {
        apiResponse = await fetch(`https://www.reddit.com/r/${subredditName}.json`)
    }
    apiResponse = await apiResponse.json()
    let posts =  apiResponse.data.children.map(post => {
        post = post.data;
        return {
            subreddit: subredditName,
            title: post.title,
            source_image: post.preview.images[0].source,
            image_resolutions: post.preview.images[0].resolutions,
            author: post.author,
            permalink: post.permalink,
            id: post.id
        };
    })
    return {posts: posts, before: apiResponse.data.before, after: apiResponse.data.after, subreddit: subredditName}
}