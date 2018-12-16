import React from 'react'
import Helmet from 'react-helmet'

const PostMeta = ({ frontmatter, excerpt, location }) => {
    // console.log(frontmatter)

    // console.log('Post Meta', location)

    const { origin } = location

    const image = frontmatter.image.childImageSharp.sizes.src
    return (
        <Helmet>
            {/* General tags */}
            <title>Joshua Iz - {frontmatter.title}</title>
            <meta name="description" content={excerpt} />
            <meta name="image" content={origin + image} />

            {/* OpenGraph tags */}
            <meta
                property="og:url"
                content={`${location.origin}${location.pathname}`}
            />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={frontmatter.title} />
            <meta property="og:description" content={excerpt} />
            <meta property="og:image" content={origin + image} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:creator" content="joshuaiz" />
            <meta name="twitter:title" content={frontmatter.title} />
            <meta name="twitter:description" content={excerpt} />
            <meta name="twitter:image" content={origin + image} />
        </Helmet>
    )
}

export default PostMeta
