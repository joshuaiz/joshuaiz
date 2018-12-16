import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layouts/HomeLayout'
import PostListWithExcerpt from '../components/Post/PostList/PostListWithExcerpt'
import SiteMeta from '../components/SiteMeta/SiteMeta'
import Logo from '../components/Header/Logo/Logo'

const IndexPage = ({
    data: {
        allMarkdownRemark: { edges }
    }
}) => (
    <Fragment>
        <SiteMeta />
        <Helmet
            title="Joshua Iz - Home"
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
                class: 'home page-home'
            }}
        />
        <Layout>
            <h4>Latest Posts:</h4>
            <PostListWithExcerpt posts={edges} />
            <div className="more-posts">
                <Link to="/words/">See all posts &rarr;</Link>
            </div>
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

export default IndexPage

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            limit: 5
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    id
                    excerpt(pruneLength: 250)
                    timeToRead
                    frontmatter {
                        date(formatString: "DD MMMM YYYY")
                        path
                        title
                        postExcerpt
                    }
                }
            }
        }
    }
`
