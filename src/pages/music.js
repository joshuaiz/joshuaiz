import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layouts/DefaultLayout'
import SiteMeta from '../components/SiteMeta/SiteMeta'
import Logo from '../components/Header/Logo/Logo'

const MusicPage = ({ location }) => (
    <Fragment>
        <SiteMeta />
        <Helmet
            title="Joshua Iz - Music"
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
                class: 'joshuaiz-music page-music'
            }}
        />
        <Layout location={location}>
            <h1 className="page-title">Music</h1>
            <div className="page-content entry-content">
                <p>
                    <i className="fas fa-headphones-alt" />
                    &nbsp; I dj and produce music. I&apos;ve been fortunate
                    enough to travel the world and dj on 5 continents, with
                    residencies at{' '}
                    <a
                        href="https://www.fabriclondon.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fabric
                    </a>{' '}
                    in London, as well as in San Francisco, Los Angeles, New
                    York City, and Chicago. I play and create everything from
                    dub reggae to disco to techno and beyond.
                </p>

                <p>
                    For all dj booking, music production and remix enquiries,
                    send an <a href="mailto:booking@joshuaiz.com">email</a> to
                    booking at joshuaiz dot com.
                </p>

                <p>
                    Even more music on the
                    <a
                        href="https://soundcloud.com/joshuaiz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        &nbsp;Joshua Iz Soundcloud page
                    </a>
                    , on the{' '}
                    <a
                        href="https://soundcloud.com/izanddiz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Iz &amp; Diz Soundcloud page
                    </a>{' '}
                    and the{' '}
                    <a
                        href="https://soundcloud.com/vizual"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vizual Soundcloud page
                    </a>
                    .
                </p>
                <p>
                    Listen to{' '}
                    <a
                        href="https://open.spotify.com/artist/4Rdj9VY1hnTP5JXt5Vg5U6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Joshua Iz on Spotify
                    </a>
                    .
                </p>
                <p>
                    Also check out my label:{' '}
                    <a
                        href="https://vizualrecords.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Vizual Records
                    </a>
                    , full discography on{' '}
                    <a
                        href="https://www.discogs.com/artist/214-Joshua"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Discogs
                    </a>
                    , my{' '}
                    <a
                        href="https://joshuaiz.bandcamp.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Bandcamp page
                    </a>{' '}
                    and{' '}
                    <a
                        href="https://www.residentadvisor.net/dj/joshuaiz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Resident Advisor
                    </a>
                    .
                </p>
            </div>
            <iframe
                title="Joshua Iz Jams playlist"
                width="640"
                height="600"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/664488531&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false"
            />
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

export default MusicPage
