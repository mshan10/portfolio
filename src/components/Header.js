import React from 'react'
import PropTypes from 'prop-types'
import Pdf from '../assets/Matthew_Shan_Resume.pdf'
import logo from '../images/msLogoWhite.svg'

const Header = (props) => (
    <header id="header" style={props.timeout ? {display: 'none'} : {}}>
        <div className="logo">
            <img src={logo} alt="" style={{ height: '100%', padding: '12px' }}/>
        </div>
        <div className="content">
            <div className="inner">
                <h1>Matt Shan</h1>
                <p>I am a highly motivated software engineer studying computer science the University of Notre Dame <br></br>
                with a passion for developing exceptional and high quality applications and software</p>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('intro')}}>About</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('work')}}>Work</a></li>
                <li><a href={Pdf}>Resume</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('about')}}>Projects</a></li>
                <li><a href="javascript:;" onClick={() => {props.onOpenArticle('contact')}}>Contact</a></li>
            </ul>
        </nav>
    </header>
)

Header.propTypes = {
    onOpenArticle: PropTypes.func,
    timeout: PropTypes.bool
}

export default Header
