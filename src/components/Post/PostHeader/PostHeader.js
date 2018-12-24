import React from 'react'

const PostHeader = ({ frontmatter, timeToRead }) => (
    <header className="article-header">
        <h1 className="post-title">{frontmatter.title}</h1>
        <div className="byline-wrap post-date">
            <span className="posted-on">
                <span className="screen-reader-text">Posted on</span>
                <time className="entry-date publish-date updated">
                    {frontmatter.date}&nbsp;|&nbsp;
                    <span className="read-time">
                        <span role="img" aria-label="emoji">
                            &#9201;
                        </span>
                        Reading time:&nbsp;
                        {timeToRead && timeToRead}
                        {timeToRead === 1 ? ' minute' : ' minutes'}
                    </span>
                </time>
            </span>
        </div>
    </header>
)

export default PostHeader
