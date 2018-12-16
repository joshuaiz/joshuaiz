import React from 'react'
import { Link } from 'gatsby'
import './MainMenu.scss'

const MainMenu = ({ location }) => {
    console.log('Menu', location)
    // get current page so we can add 'current-menu-item' class
    const currentUrl = location ? location.pathname.replace(/\//g, '') : null

    console.log('Menu', currentUrl)

    const words = 'words'
    const music = 'music'

    return (
        <nav className="primary-nav">
            <ul className="main-menu">
                <li>
                    <Link to="/words/">
                        {currentUrl && currentUrl.includes(words) ? (
                            <span className="active">Words</span>
                        ) : (
                            <span>Words</span>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/music/">
                        {currentUrl === music ? (
                            <span className="active">Music</span>
                        ) : (
                            <span>Music</span>
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default MainMenu
