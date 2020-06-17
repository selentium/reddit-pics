import React from 'react'

export default function SubredditsDialog({ subreddits, availableSubreddits, settingsOpen, closeSettings, addSubreddit, removeSubreddit, removeSubredditFromPosts, canRemoveSubreddit }) {
    let display = settingsOpen ? 'block' : 'none';


    const subredditsMarkup = availableSubreddits.map((subreddit) => {
        let id = "checkbox-" + subreddit
        let checked = subreddits.includes(subreddit) ? 'checked' : '';
        let disabled = '';
        if ((checked == 'checked') && !canRemoveSubreddit) {
            disabled = 'disabled';
        }
        const handleChange = (e, sr) => {
            if (e.target.checked) {
                addSubreddit(sr);
            }
            else {
                removeSubreddit(sr);
                removeSubredditFromPosts(sr);
            }
        }
        return (
            <div className="form-check" key={subreddit}>
                <input className="form-check-input" type="checkbox" checked={checked} disabled={disabled}  onChange={(e) => handleChange(e, subreddit)} id={id} />
                <label className="form-check-label" htmlFor={id}>
                    {subreddit}
                </label>
            </div>
        );
    });
    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: display }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chose subreddits</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => closeSettings(e)}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            {subredditsMarkup}
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={(e) => closeSettings()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}