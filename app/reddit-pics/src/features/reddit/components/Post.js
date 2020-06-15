import React from 'react'

const Post = ({ currentPost, hasPrevPost, hasNextPost, nextPost, prevPost }) => {
    let prevPostButton, nextPostButton;
    if (hasPrevPost) {
        prevPostButton = (
            <div className="p-2">
                <button onClick={(e) => {e.preventDefault(); prevPost(); document.querySelector("#image-title").scrollIntoView();}} className="btn ntn-sm btn-success">«</button>
            </div>
        )
    }
    if (hasNextPost) {
        nextPostButton = (
            <div className="p-2">
                <button onClick={(e) => {e.preventDefault(); nextPost(); document.querySelector("#image-title").scrollIntoView();}} className="btn ntn-sm btn-success">»</button>
            </div>
        )
    }
    let imageSrc = currentPost.image_resolutions[currentPost.image_resolutions.length - 1].url
    imageSrc = imageSrc.replace(/&amp;/g, '&')
    return (
        <div className="p-2">
            <h4 id="image-title"><a href={currentPost.permalink}>{currentPost.title}</a></h4>
            <a href={currentPost.permalink}><img className="img-fluid" title={currentPost.title} alt={currentPost.title} src={imageSrc} /></a>
            <p className="meta">From <a href="">r/{currentPost.subreddit}</a> by <a href="#">u/{currentPost.author}</a></p>
            <div className="d-flex justify-content-center">
                {prevPostButton}
                {nextPostButton}
            </div>
        </div>
    )
}

export default Post