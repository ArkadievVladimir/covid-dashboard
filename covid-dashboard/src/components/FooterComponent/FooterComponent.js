import React from 'react';
import './FooterComponent.css';
import GitLinkComponent from './GitLinkComponent/index';
import LogoLinkComponent from './LogoLinkComponent/index';
import CopyrightComponent from './CopyrightComponent/index';

const FooterComponent = () => {
    return (
        <footer className="footer-wrapper">
            <GitLinkComponent />
            <LogoLinkComponent />
            <CopyrightComponent />
        </footer>
    )
}

export default FooterComponent;