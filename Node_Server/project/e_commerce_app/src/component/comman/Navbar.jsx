import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBagShopping, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../css/Navbar.css';
import logo from '../../component/img/brandLogo.png';
import { changeUserInfo } from '../redux/userSlice';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userData = useSelector(state => state.userData?.value);

    const handleNavClick = () => setMenuOpen(false);

    const logoutHandler = () => {
        dispatch(changeUserInfo({ isLoginStatus: false, role: "" }));
    };

    useEffect(() => {
        if (!userData?.isLoginStatus) {
            navigate("/");
        }
    }, [userData?.isLoginStatus]);

    return (
        <header className="header1">
            <div className="container1">
                {/* Logo */}
                <div className="header__logo1">
                    <Link to="/" className="logo1">
                        <img src={logo} alt="Brand Logo" width={60} />
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="canvas__open1" onClick={() => setMenuOpen(!menuOpen)}>
                    &#9776;
                </div>

                {/* Navigation Menu */}
                {userData?.isLoginStatus ? (
                    <nav className={`header__menu1 ${menuOpen ? 'mobile-menu1' : ''}`}>
                        <ul onClick={handleNavClick}>
                            <li><Link to="/">Home</Link></li>
                            {userData.role === 'admin' && (
                                <>
                                    <li><Link to="/admin/allUser">Users</Link></li>
                                    <li><Link to="/admin/product">Products</Link></li>
                                    <li><Link to="/admin/category">Categories</Link></li>
                                    <li><Link to="/admin/brand">Brands</Link></li>
                                    <li><Link to="/admin/order">Orders</Link></li>

                                </>
                            )}
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contacts</Link></li>
                            {userData.role != 'admin' && (
                                <>
                                    <li><Link to="/profile">Profile</Link></li>
                                    <li><Link to="/product">Product</Link></li>
                                    <li><Link to="/cart">Cart <FontAwesomeIcon icon={faBagShopping} className="icon" /></Link></li>
                                    <li><Link to="/viewOrder">Orders</Link></li>
                                </>

                            )}
                            <li>
                                <Link onClick={logoutHandler} className="logout-button">Logout</Link>
                            </li>
                            <li><Link to="#"><FontAwesomeIcon icon={faMagnifyingGlass} className="icon" /></Link></li>
                            <li><Link to="#"><FontAwesomeIcon icon={faHeart} className="icon" /></Link></li>
                        </ul>
                    </nav>
                ) : (
                    <nav className={`header__menul ${menuOpen ? 'mobile-menu1' : ''}`}>
                        <ul onClick={handleNavClick}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/product">Product</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contacts</Link></li>
                            <li><Link to="/login"><FontAwesomeIcon icon={faUser} /> Login</Link></li>
                            <li><Link to="/register"><FontAwesomeIcon icon={faUser} /> Register</Link></li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Navbar;
