import React from 'react';
import '../style/navbar.scss';

const NavBar = () => {
    return (
        <React.Fragment>
            <nav>
                <span>Logo</span>
                <ul>
                    <li>Home</li>
                    <li>Sign UP</li>
                    <li>Sign In</li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;
