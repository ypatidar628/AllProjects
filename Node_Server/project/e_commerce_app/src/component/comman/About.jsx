import React from "react";
// import "../css/About.css";
import "../css/elegant-icons.css";

import img from "../img/about/testimonial-author.jpg";
import img2 from "../img/about/testimonial-pic.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faQuoteRight} from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
   <div>
       <section className="testimonial">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 p-0">
                    <div className="testimonial__text">
                        <span><FontAwesomeIcon icon={faQuoteRight} style={{color: "#e53637",}} /></span>
                        <p>“Going out after work? Take your butane curling iron with you to the office, heat it up,
                            style your hair before you leave the office and you won’t have to make a trip back home.”
                        </p>
                        <div className="testimonial__author">
                            <div className="testimonial__author__pic">
                                <img src={img} alt="" />
                            </div>
                            <div className="testimonial__author__text">
                                <h5>Augusta Schultz</h5>
                                <p>Fashion Design</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 p-0">
                    <div className="testimonial__pic set-bg"><img src={img2} alt="" style={{marginTop:"100px", borderRadius:"8px"}}/></div>
                </div>
            </div>
        </div>
    </section>

    <section className="counter spad">
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                            <h2 className="cn_num">102</h2>
                        </div>
                        <span>Our <br />Clients</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                            <h2 className="cn_num">30</h2>
                        </div>
                        <span>Total <br />Categories</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                            <h2 className="cn_num">102</h2>
                        </div>
                        <span>In <br />Country</span>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6">
                    <div className="counter__item">
                        <div className="counter__item__number">
                            <h2 className="cn_num">98</h2>
                            <strong>%</strong>
                        </div>
                        <span>Happy <br />Customer</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
   </div>
  );
}

export default About;
