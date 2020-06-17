import React from 'react'

import Post from './Post'
import SubredditsDialog from './SubredditsDialog'
import {SITE_TITLE} from '../settings'



const Layout = (props) => {
    let postJSX;
    if (props.currentPost) {
        postJSX = (
            <Post
                currentPost={props.currentPost}
                hasPrevPost={props.hasPrevPost}
                hasNextPost={props.hasNextPost}
                nextPost={props.nextPost}
                prevPost={props.prevPost} />
        )
    }

    return (
        <div>
            <header>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand">{SITE_TITLE}</span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="#" onClick={(e) => { e.preventDefault(); props.openSettings(); }}>Settings</a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="row justify-content-center align-items-center">
                <div className="col-8">
                    <div className="d-flex justify-content-center">
                        {postJSX}
                    </div>
                </div>
            </div>
            <SubredditsDialog
                subreddits={props.subreddits}
                availableSubreddits={props.availableSubreddits}
                settingsOpen={props.settingsOpen}
                canRemoveSubreddit={props.canRemoveSubreddit}
                closeSettings={() => props.closeSettings()}
                addSubreddit={(sr) => props.addSubreddit(sr)}
                removeSubreddit={(sr) => props.removeSubreddit(sr)}
                removeSubredditFromPosts={(sr) => props.removeSubredditFromPosts(sr)} />
        </div>

    );
}

export default Layout