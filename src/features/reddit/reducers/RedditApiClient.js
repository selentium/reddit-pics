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
    let posts = apiResponse.data.children.map(post => {
        post = post.data;
        if (!post.hasOwnProperty('preview')) {
            return null;
        }
        if (post.preview.images[0].source.url.includes('https://external-preview.redd.it/')) {
            return null;
        }
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
    posts = posts.filter((p) => p != null)
    return {posts: posts, before: apiResponse.data.before, after: apiResponse.data.after, subreddit: subredditName}
}