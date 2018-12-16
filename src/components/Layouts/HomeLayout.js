import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import banner from '../../images/banner.png'
import './style.scss'

const HomeLayout = ({ children }) => (
    <div className="container">
        <Header />
        <div className="hero home-hero">
            <img src={banner} alt="hero" />
        </div>
        <div className="content">
            <div className="inner-content wrap">
                <h2 className="home-intro">
                    My name is{' '}
                    <a
                        className="intro-link"
                        href="https://twitter.com/joshuaiz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Joshua Iz
                    </a>
                    . I’m a dj, music producer, coder, designer, coffee lover,
                    traveler, and writer in Chicago.
                </h2>
                <main className="main">{children}</main>
            </div>
        </div>
        <Footer />
    </div>
)

export default HomeLayout
