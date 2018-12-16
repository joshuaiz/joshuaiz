import React from 'react'
import { Link } from 'gatsby'
import { slugify } from '../../../helpers/helpers'

const PostListWithExcerpt = ({ posts }) => (
    <ul className="posts-list nostyle">
        {posts.map(({ node }) => (
            <li
                key={node.id}
                className={`post-list post-list-${node.id} post-list-${slugify(
                    node.frontmatter.title
                )}`}
            >
                <Link className="post-link" to={node.frontmatter.path}>
                    <h3 className="post-title">{node.frontmatter.title} </h3>
                </Link>
                <div className="post-date">
                    {node.frontmatter.date}&nbsp;|&nbsp;
                    <span role="img" aria-label="emoji">
                        &#9201;
                    </span>
                    &nbsp;Reading time:&nbsp;
                    {node.timeToRead && node.timeToRead}
                    {node.timeToRead === 1 ? ' minute' : ' minutes'}
                </div>
                <div className="post-content">
                    <div className="post-excerpt">
                        {node.frontmatter.postExcerpt
                            ? node.frontmatter.postExcerpt
                            : node.excerpt}
                    </div>
                </div>
            </li>
        ))}
    </ul>
)

export default PostListWithExcerpt
