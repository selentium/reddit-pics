import React from 'react'

const Post = ({ currentPost, hasPrevPost, hasNextPost, nextPost, prevPost }) => {
    let prevPostButton, nextPostButton;
    if (hasPrevPost) {
        prevPostButton = (
            <div className="p-2">
                <button onClick={(e) => {e.preventDefault(); prevPost(); document.querySelector("#image-title").scrollIntoView({behavior: 'smooth'});}} className="btn ntn-sm btn-success">«</button>
            </div>
        )
    }
    if (hasNextPost) {
        nextPostButton = (
            <div className="p-2">
                <button onClick={(e) => {e.preventDefault(); nextPost(); document.querySelector("#image-title").scrollIntoView({behavior: 'smooth'});}} className="btn ntn-sm btn-success">»</button>
            </div>
        )
    }

    return (
        <div className="p-2">
            <h4 id="image-title"><a href={currentPost.permalink}>{currentPost.title}</a></h4>
            <a href={currentPost.permalink}><img className="img-fluid" title={currentPost.title} alt={currentPost.title} src={currentPost.imageSrc} /></a>
            <p className="meta">From <a href={currentPost.subredditURL}>r/{currentPost.subreddit}</a> by <a href={currentPost.authorURL}>u/{currentPost.author}</a></p>
            <div className="d-flex justify-content-center">
                {prevPostButton}
                {nextPostButton}
            </div>
        </div>
    )
}

export default Post