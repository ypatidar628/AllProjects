import { Link } from "react-router-dom";
import logo from '../img/brandLogo.png';
import payment from "../img/payment.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <Link to="#"><img src={logo} alt="" width={100}></img></Link>

                                </div>
                                <p>The customer is at the heart of our unique business model, which includes design.</p>
                                <Link to="#"><img src={payment} alt=""></img>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><Link to="#">Clothing Store</Link></li>
                                    <li><Link to="#">Trending Shoes</Link></li>
                                    <li><Link to="#">Accessories</Link></li>
                                    <li><Link to="#">Sale</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><Link to="#">Contact Us</Link></li>
                                    <li><Link to="#">Payment Methods</Link></li>
                                    <li><Link to="#">Delivary</Link></li>
                                    <li><Link to="#">Return & Exchanges</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                <h6>NewLetter</h6>
                                <div className="footer__newslatter">
                                    <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                                    <form action="#">
                                        <input type="text" placeholder="Your email"/>
                                        <button type="submit"><FontAwesomeIcon icon={faEnvelopeCircleCheck} /></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="footer__copyright__text">
                                <p>Copyright © 2020 All rights reserved | This template is made with <FontAwesomeIcon icon={faHeart} /> by <Link to="https://colorlib.com" target="_blank">Colorlib</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
export default Footer;