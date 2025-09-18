// import search from "./component/img/icon/search.png";
// import heart from "./component/img/icon/heart.png";
// import cart from "./component/img/icon/cart.png";
// import logo from "./component/img/logo.png";

import { Link } from "react-router-dom";
import Footer from "../comman/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

function Contact() {
    return (
        <div className="container">
    
    <section className="contact spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-md-6">
                    <div className="contact__text">
                        <div className="section-title">
                            <span>Information</span>
                            <h2>Contact Us</h2>
                            <p>As you might expect of a company that began as a high-end interiors contractor, we pay
                                strict attention.</p>
                        </div>
                        <ul>
                            <li>
                                <h4>America</h4>
                                <p>195 E Parker Square Dr, Parker, CO 801 <br />+43 982-314-0958</p>
                            </li>
                            <li>
                                <h4>France</h4>
                                <p>109 Avenue Léon, 63 Clermont-Ferrand <br />+12 345-423-9893</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6">
                    <div className="contact__form">
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-6">
                                    <input type="text" placeholder="Name" />
                                </div>
                                <div className="col-lg-6">
                                    <input type="text" placeholder="Email" />
                                </div>
                                <div className="col-lg-12">
                                    <textarea placeholder="Message"></textarea>
                                    <button type="submit" className="site-btn">Send Message <FontAwesomeIcon icon={faPaperPlane} /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </div>
    )
}
export default Contact;