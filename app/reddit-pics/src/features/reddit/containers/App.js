import React, { Component } from 'react'
import {connect} from 'react-redux'

import {hasPrevPost, hasNextPost, needToFetch, canFetch, currentPost, postsSlice, fetchPosts} from '../reducers/posts'
import {availableSubreddits, subredditsSlice, canRemoveSubreddit} from '../reducers/subreddits'

import Layout from '../components/Layout'


class App extends Component {

    fetchAll() {
        for (let i = 0; i < this.props.subreddits.length; ++i) {
            this.props.fetchPosts(this.props.subreddits[i])
        }
    }

    componentDidMount() {
        this.fetchAll();
    }

    componentDidUpdate() {
        if (this.props.needToFetch) {
            this.fetchAll();
        }
    }

    render() {
        return (
            <Layout {...this.props} />
        )
    }

}

const mapStateToProps = state => {
    return {
        subreddits: state.subreddits.subreddits,
        availableSubreddits: availableSubreddits,
        settingsOpen: state.subreddits.settingsOpen,
        canRemoveSubreddit: canRemoveSubreddit(state),
        hasPrevPost: hasPrevPost(state),
        hasNextPost: hasNextPost(state),
        needToFetch: needToFetch(state),
        canFetch: canFetch(state),
        currentPost: currentPost(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nextPost: () => dispatch(postsSlice.actions.next()),
        prevPost: () => dispatch(postsSlice.actions.prev()),
        fetchPosts: criteria => dispatch(fetchPosts(criteria)),
        removeSubredditFromPosts: subreddit => dispatch(postsSlice.actions.removeSubreddit(subreddit)),
        addSubreddit: subreddit => dispatch(subredditsSlice.actions.addSubreddit(subreddit)),
        removeSubreddit: subreddit => dispatch(subredditsSlice.actions.removeSubreddit(subreddit)),
        openSettings: () => dispatch(subredditsSlice.actions.openSettings()),
        closeSettings: () => dispatch(subredditsSlice.actions.closeSettings()),
        toggleSubreddit: (sr) => dispatch(subredditsSlice.actions.toggleSubreddit, sr)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)