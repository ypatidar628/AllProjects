import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter as faXTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/Home.css'; // Link to the CSS file

function Home() {
    const slide1Ref = useRef();
    const slide2Ref = useRef();

    useEffect(() => {
        gsap.fromTo(slide1Ref.current, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
        gsap.fromTo(slide2Ref.current, 
            { opacity: 0, y: 50 }, 
            { opacity: 1, y: 0, duration: 1, delay: 0.5 }
        );
    }, []);

    return (
        <div>
            <Splide 
                options={{
                    rewind: true,
                    type: 'loop',
                    perPage: 1,
                    perMove: 1,
                    autoplay: true,
                    gap: '1rem',
                }}
            >
                <SplideSlide>
                    <div className="hero-slide set-bg1">
                        <div className="hero-text" ref={slide1Ref}>
                            <h6>Summer Collection</h6>
                            <h2>Fall - Winter Collections 2030</h2>
                            <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.</p>
                            <Link to="#" className="primary-btn">Shop now</Link>
                            <div className="hero-social">
                                <Link to="#"><FontAwesomeIcon icon={faFacebook} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faXTwitter} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faPinterest} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <div className="hero-slide set-bg2">
                        <div className="hero-text" ref={slide2Ref}>
                            <h6>Summer Collection</h6>
                            <h2>Fall - Winter Collections 2030</h2>
                            <p>A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.</p>
                            <Link to="#" className="primary-btn">Shop now</Link>
                            <div className="hero-social">
                                <Link to="#"><FontAwesomeIcon icon={faFacebook} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faXTwitter} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faPinterest} /></Link>
                                <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
                            </div>
                        </div>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    );
}

export default Home;
