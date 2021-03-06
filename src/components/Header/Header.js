import React from 'react'
import { Link } from 'gatsby'
import MainMenu from './Menu/MainMenu'
import Logo from './Logo/Logo'
import './Header.scss'

const Header = ({ location }) => (
    <header className="header">
        <div className="inner-header wrap">
            <Logo />
            <div className="site-title">
                <Link to="/">Joshua Iz</Link>
            </div>
            <MainMenu location={location} />
        </div>
    </header>
)

export default Header
