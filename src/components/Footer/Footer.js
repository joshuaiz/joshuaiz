import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import './Footer.scss'

const Footer = ({ data }) => {
    const year = new Date().getFullYear()
    const { title, author } = data.site.siteMetadata
    return (
        <footer className="footer">
            <div className="inner-footer wrap">
                <div className="contact-link">
                    <a href="mailto:contact@joshuaiz.com">
                        <i className="far fa-envelope" />
                        &nbsp;Contact me
                    </a>{' '}
                    for dj bookings, remix inquiries, speaking engagements,
                    design/development work, or if you just want to chat.
                </div>
                <div className="extra-links">
                    <a
                        href="https://vizualrecords.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="vizual-icon">
                            <img
                                src="https://s3.amazonaws.com/joshuaizstatic/images/vizual_blue.svg"
                                alt="Vizual Records icon"
                            />
                        </i>
                        Vizual Records
                    </a>
                    <a
                        href="https://izanddiz.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="id-icon">
                            <img
                                src="https://s3.amazonaws.com/joshuaizstatic/images/id_icon.svg"
                                alt="Iz & Diz icon"
                            />
                        </i>
                        Iz &amp; Diz
                    </a>
                </div>
                <span className="icons-wrap">
                    <a href="https://twitter.com/joshuaiz/">
                        <i className="fab fa-twitter" />
                        {author}
                    </a>
                    <a href="https://instagram.com/joshuaiz">
                        <i className="fab fa-instagram" />
                        @joshuaiz
                    </a>
                    <a href="https://soundcloud.com/joshuaiz">
                        <i className="fab fa-soundcloud" />
                        SoundCloud
                    </a>
                    <a href="https://github.com/joshuaiz">
                        <i className="fab fa-github" />
                        GitHub
                    </a>
                    <a href="https://studio.bio">
                        <i className="sb-icon">
                            <img
                                src="https://s3.amazonaws.com/joshuaizstatic/images/sb_logo_sbblue.svg"
                                alt="studio.bio icon"
                            />
                        </i>
                        studio.bio
                    </a>
                </span>
                <p className="source-org copyright">
                    <span>&copy;</span> {year} {title}. It iz what it iz.
                </p>
            </div>
        </footer>
    )
}

export default props => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                        author
                    }
                }
            }
        `}
        render={data => <Footer data={data} {...props} />}
    />
)
