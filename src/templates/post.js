import React, { Fragment } from 'react'
import { graphql, Link } from 'gatsby'
import Parser from 'html-react-parser'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import PostMeta from '../components/Post/PostMeta'
import Layout from '../components/Layouts/DefaultLayout'
import PostHeader from '../components/Post/PostHeader/PostHeader'
import PostFooter from '../components/Post/PostFooter/PostFooter'
import Playlist from '../components/Playlist/Playlist'
import { slugify } from '../helpers/helpers'

const PostTemplate = ({ data, location, pageContext }) => {
    const { markdownRemark } = data // data.markdownRemark holds our post data
    // console.log(pageContext)
    const { frontmatter, html, excerpt, id, timeToRead } = markdownRemark

    // console.log('Post', frontmatter)

    // create a slug from the Post Title
    const slug = slugify(frontmatter.title.toString())

    return (
        <Fragment>
            <PostMeta
                frontmatter={frontmatter}
                excerpt={
                    frontmatter.postExcerpt ? frontmatter.postExcerpt : excerpt
                }
                location={location}
            />
            <Helmet
                bodyAttributes={{
                    class: `single-post postid-${id} post-${slug}`
                }}
            >
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
                    integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP"
                    crossOrigin="anonymous"
                />
            </Helmet>
            <Layout>
                <Link className="posts-link" to="/words/">
                    &larr; Back to Posts
                </Link>
                <article className={`type-post hentry article-${slug}`}>
                    <PostHeader
                        frontmatter={frontmatter}
                        timeToRead={timeToRead}
                    />
                    <section className="entry-content">
                        <div className="post-image">
                            {frontmatter.image && (
                                <Img
                                    sizes={
                                        frontmatter.image.childImageSharp.sizes
                                    }
                                />
                            )}
                        </div>
                        <div className="post-content">{Parser(html)}</div>
                    </section>
                    <footer className="article-footer">
                        {frontmatter.withAudio && (
                            <Playlist frontmatter={frontmatter} />
                        )}
                    </footer>
                    <PostFooter pageContext={pageContext} />
                </article>
            </Layout>
        </Fragment>
    )
}

export default PostTemplate

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            id
            html
            excerpt
            timeToRead
            frontmatter {
                date(formatString: "DD MMMM YYYY")
                path
                title
                postExcerpt
                withAudio
                playlist
                playlistTitle
                playlistSubtitle
                bandcampLink
                vizualLink
                spotifyLink
                image {
                    childImageSharp {
                        sizes(maxWidth: 1200) {
                            ...GatsbyImageSharpSizes
                        }
                    }
                }
            }
        }
    }
`
