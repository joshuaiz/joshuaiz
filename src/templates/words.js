import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import SiteMeta from '../components/SiteMeta/SiteMeta'
import Layout from '../components/Layouts/DefaultLayout'
import PostListWithExcerpt from '../components/Post/PostList/PostListWithExcerpt'
import Pagination from '../components/Pagination/Pagination'
import Logo from '../components/Header/Logo/Logo'

/* eslint-disable */
const NavLink = props => {
    if (!props.test) {
        return <Link to={props.url}>{props.text}</Link>
    } else {
        return <span>{props.text}</span>
    }
}

/* eslint-enable */

const IndexPage = ({ pageContext }) => {
    const { group, index } = pageContext

    console.log(group)
    return (
        <Fragment>
            <SiteMeta />
            <Helmet
                title={`Joshua Iz - Words - Page ${index}`}
                meta={[
                    {
                        name: 'description',
                        content:
                            "I'm a dj, producer, coder, designer, developer, and writer, based in Chicago."
                    },
                    {
                        name: 'keywords',
                        content:
                            'joshuaiz, izanddiz, blog, dj-blog, coding, development-blog, house-music, design, web-development, music'
                    }
                ]}
                bodyAttributes={{
                    class: `blogroll page-blog page-words page-words-${index}`
                }}
            />
            <Layout>
                <h4>
                    {index === 1 ? `Latest Posts:` : `Posts Page: ${index}`}
                </h4>
                <PostListWithExcerpt posts={group} />
                <Pagination pageContext={pageContext} />
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
                </div>
            </Layout>
        </Fragment>
    )
}

export default IndexPage
