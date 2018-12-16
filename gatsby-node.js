/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    // const blogPostTemplate = path.resolve(`src/templates/post.js`)
    const postTemplate = path.resolve('./src/templates/post.js')

    return graphql(`
        {
            allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
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
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        result.data.allMarkdownRemark.edges.forEach(({ node }, index) => {
            const prev = index === 0 ? false : posts[index - 1].node
            const next =
                index === posts.length - 1 ? false : posts[index + 1].node
            createPage({
                path: node.frontmatter.path,
                component: postTemplate,
                context: {
                    id: node.id,
                    prev,
                    next
                } // additional data can be passed via context
            })
        })

        createPaginatedPages({
            edges: result.data.allMarkdownRemark.edges,
            createPage,
            pageTemplate: 'src/templates/words.js',
            pageLength: 5,
            pathPrefix: 'words'
        })
    })
}
