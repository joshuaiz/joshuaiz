import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import './style.scss'

const DefaultLayout = ({ children }) => (
    <div className="container">
        <Header />
        <div className="content">
            <div className="inner-content wrap">
                <main className="main">{children}</main>
            </div>
        </div>
        <Footer />
    </div>
)

export default DefaultLayout
