import React from 'react'
import { Link } from 'gatsby'
import './MainMenu.scss'

const MainMenu = () => (
    <nav className="primary-nav">
        <ul className="main-menu">
            <li>
                <Link to="/words/">Words</Link>
            </li>
            <li>
                <Link to="/music/">Music</Link>
            </li>
        </ul>
    </nav>
)

export default MainMenu
