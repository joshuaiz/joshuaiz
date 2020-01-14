module.exports = {
    siteMetadata: {
        title: 'Joshua Iz',
        subtitle: 'A collection of words, music, designs, and code.',
        description:
            "My name is Joshua Iz. I'm a dj, music producer, developer, designer, and sometimes writer based in Chicago. These are my words.",
        author: '@joshuaiz',
        url: 'https://joshuaiz.com',
        image:
            'https://s3.amazonaws.com/joshuaizstatic/images/joshuaiz_og13.png',
        // These are default images for pages without them explicitly set
        // You should create two different images. See here:
        // https://iamturns.com/open-graph-image-size/
        facebookImage:
            'https://s3.amazonaws.com/joshuaizstatic/images/joshuaiz_og13.png',
        twitterImage:
            'https://s3.amazonaws.com/joshuaizstatic/images/joshuaiz_og13.png',
        twitterUser: '@joshuaiz'
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                // replace "UA-XXXXXXXXX-X" with your own Tracking ID
                trackingId: 'UA-131094922-3'
            }
        },
        `gatsby-plugin-sass`,
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/posts`,
                name: 'markdown-pages'
            }
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-prismjs`,
                        options: {
                            // Class prefix for <pre> tags containing syntax highlighting;
                            // defaults to 'language-' (eg <pre class="language-js">).
                            // If your site loads Prism into the browser at runtime,
                            // (eg for use with libraries like react-live),
                            // you may use this to prevent Prism from re-processing syntax.
                            // This is an uncommon use-case though;
                            // If you're unsure, it's best to use the default value.
                            classPrefix: 'language-',
                            // This is used to allow setting a language for inline code
                            // (i.e. single backticks) by creating a separator.
                            // This separator is a string and will do no white-space
                            // stripping.
                            // A suggested value for English speakers is the non-ascii
                            // character '›'.
                            inlineCodeMarker: null,
                            // This lets you set up language aliases.  For example,
                            // setting this to '{ sh: "bash" }' will let you use
                            // the language "sh" which will highlight using the
                            // bash highlighter.
                            aliases: {},
                            // This toggles the display of line numbers globally alongside the code.
                            // To use it, add the following line in src/layouts/index.js
                            // right after importing the prism color scheme:
                            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
                            // Defaults to false.
                            // If you wish to only show line numbers on certain code blocks,
                            // leave false and use the {numberLines: true} syntax below
                            showLineNumbers: false,
                            // If setting this to true, the parser won't handle and highlight inline
                            // code used in markdown i.e. single backtick code like `this`.
                            noInlineHighlight: false
                        }
                    }
                ]
            }
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Joshua Iz',
                short_name: 'joshuaiz',
                start_url: '/',
                background_color: '#00011d',
                theme_color: '#0056ac',
                display: 'minimal-ui',
                icon: 'src/images/favicon/favicon.png' // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `merriweather\:300,300i,400,400i,700,700i`,
                    `rubik\:400,500,700`, // you can also specify font weights and styles
                    `rubik mono one`
                ]
            }
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
              {
                site {
                  siteMetadata {
                    title
                    description
                    url
                    site_url: url
                  }
                }
              }
            `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMarkdownRemark } }) => {
                            return allMarkdownRemark.edges.map(edge => {
                                return Object.assign(
                                    {},
                                    edge.node.frontmatter,
                                    {
                                        description: edge.node.excerpt,
                                        date: edge.node.frontmatter.date,
                                        url:
                                            site.siteMetadata.url +
                                            edge.node.fields.slug,
                                        guid:
                                            site.siteMetadata.url +
                                            edge.node.fields.slug,
                                        custom_elements: [
                                            {
                                                'content:encoded':
                                                    edge.node.html
                                            }
                                        ]
                                    }
                                )
                            })
                        },
                        query: `
                  {
                    allMarkdownRemark {
                      nodes {
                        excerpt
                        html
                        frontmatter {
                          date
                          title
                          postExcerpt
                          image {
                            childImageSharp {
                              original {
                                src
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                `,
                        output: '/rss.xml',
                        title: 'Joshua Iz - RSS Feed'
                    }
                ]
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.app/offline
        // 'gatsby-plugin-offline',
    ]
}
