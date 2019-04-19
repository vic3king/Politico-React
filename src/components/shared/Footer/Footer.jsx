import React from 'react';
import '../../../style/footer.scss';

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="main-footer">
        <nav>
          <ul className="main-footer__links">
            <li className="main-footer__link">
              <a href="/">Support</a>
            </li>
            <li className="main-footer__link">
              <a href="/">Terms of Use</a>
            </li>
          </ul>
        </nav>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
