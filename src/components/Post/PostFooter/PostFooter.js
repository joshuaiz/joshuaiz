import React from 'react'
import { Link } from 'gatsby'
import Logo from '../../Header/Logo/Logo'
import './PostFooter.scss'

const PostFooter = ({ pageContext }) => {
    // console.log(pageContext)

    // make sure there is a prev or next before setting variables
    const next =
        pageContext.next !== false ? pageContext.next.frontmatter.path : null
    const nextTitle =
        pageContext.next !== false ? pageContext.next.frontmatter.title : null

    const prev =
        pageContext.prev !== false ? pageContext.prev.frontmatter.path : null

    const prevTitle =
        pageContext.prev !== false ? pageContext.prev.frontmatter.title : null

    return (
        <div className="post-footer">
            <div className="post-footer-logo">
                <Logo />
                <div className="site-title">
                    <a
                        href="https://twitter.com/joshuaiz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Joshua Iz
                    </a>
                </div>
            </div>
            <nav className="post-pagination pagination">
                <div className="previous-next">
                    <div className="next-link">
                        {next && <Link to={next}>&larr;&nbsp;{nextTitle}</Link>}
                    </div>
                    <div className="previous-link">
                        {prev && <Link to={prev}>{prevTitle}&nbsp;&rarr;</Link>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default PostFooter
