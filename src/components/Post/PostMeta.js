import React from 'react'
import Helmet from 'react-helmet'

const PostMeta = ({ frontmatter, excerpt, location }) => {
    // console.log(frontmatter)
    return (
        <Helmet>
            {/* General tags */}
            <title>Joshua Iz - {frontmatter.title}</title>
            <meta name="description" content={excerpt} />
            <meta name="image" content={frontmatter.image} />

            {/* OpenGraph tags */}
            <meta
                property="og:url"
                content={`${location.origin}${location.pathname}`}
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={frontmatter.title} />
            <meta property="og:description" content={excerpt} />
            <meta
                property="og:image"
                content={frontmatter.image && frontmatter.image}
            />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="joshuaiz" />
            <meta name="twitter:title" content={frontmatter.title} />
            <meta name="twitter:description" content={excerpt} />
            <meta
                name="twitter:image"
                content={frontmatter.image && frontmatter.image}
            />
        </Helmet>
    )
}

export default PostMeta
