import fetch from 'cross-fetch';

export const fetchSubreddit  = async subredditName => {
    let apiResponse = await fetch(`https://www.reddit.com/r/${subredditName}.json`)
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
    return {posts: posts, before: apiResponse.data.before, after: apiResponse.data.after}
}