import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CartUomo from '../components/common/CartUomo';
import LanguageSwitcher from '../components/common/LanguageSwitcher';

const HeaderUomo = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();
    const isSpanish = router.pathname.startsWith('/es');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    return (
        <>
            <header className={`uomo-header header-sports ${scrolled ? 'header-sticky' : ''}`}>
                <div className="container">
                    <div className="header-wrapper d-flex align-items-center justify-content-between">
                        {/* Logo */}
                        <div className="header-logo">
                            <Link legacyBehavior href="/">
                                <a className="logo-link">
                                    <img src="/logo-dosalga.png" alt="Dosalga" className="logo-img" />
                                </a>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="header-nav d-none d-lg-flex">
                            <ul className="nav-menu">
                                <li className={router.pathname === (isSpanish ? '/es/about-us' : '/about-us') ? 'active' : ''}>
                                    <Link legacyBehavior href={isSpanish ? "/es/about-us" : "/about-us"}>
                                        <a>{isSpanish ? 'SOBRE NOSOTROS' : 'ABOUT US'}</a>
                                    </Link>
                                </li>
                                <li className={router.pathname === (isSpanish ? '/es/services' : '/services') ? 'active' : ''}>
                                    <Link legacyBehavior href={isSpanish ? "/es/services" : "/services"}>
                                        <a>{isSpanish ? 'SERVICIOS' : 'SERVICES'}</a>
                                    </Link>
                                </li>
                                <li className={router.pathname === (isSpanish ? '/es/contact' : '/contact') ? 'active' : ''}>
                                    <Link legacyBehavior href={isSpanish ? "/es/contact" : "/contact"}>
                                        <a>{isSpanish ? 'CONTACTO' : 'CONTACT'}</a>
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        {/* Header Actions */}
                        <div className="header-actions d-flex align-items-center">
                            {/* Search */}
                            <button 
                                className="header-action-btn search-btn" 
                                onClick={toggleSearch}
                                aria-label="Search"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>

                            {/* Account */}
                            <button 
                                className="header-action-btn account-btn" 
                                data-bs-toggle="modal" 
                                data-bs-target="#user-login"
                                aria-label="Account"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="currentColor"/>
                                    <path d="M10 12.5C5.16797 12.5 1.25 16.418 1.25 21.25C1.25 21.6642 1.58579 22 2 22H18C18.4142 22 18.75 21.6642 18.75 21.25C18.75 16.418 14.832 12.5 10 12.5Z" fill="currentColor"/>
                                </svg>
                            </button>

                            {/* Wishlist */}
                            <Link legacyBehavior href="/shop/whistlist">
                                <a className="header-action-btn wishlist-btn" aria-label="Wishlist">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z" fill="currentColor"/>
                                    </svg>
                                </a>
                            </Link>

                            {/* Language Switcher */}
                            <div className="header-action-btn lang-switcher-wrapper">
                                <LanguageSwitcher />
                            </div>

                            {/* Cart */}
                            <div className="header-action-btn cart-wrapper">
                                <CartUomo/>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button 
                                className={`header-action-btn mobile-menu-toggle d-lg-none ${isMobileMenuOpen ? 'active' : ''}`}
                                onClick={toggleMobileMenu}
                                aria-label="Toggle menu"
                            >
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Overlay */}
                {isSearchOpen && (
                    <div className="search-overlay">
                        <div className="search-popup">
                            <button className="close-search" onClick={toggleSearch}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                            <form className="search-form">
                                <input 
                                    type="search" 
                                    placeholder="Search products..." 
                                    autoFocus
                                />
                                <button type="submit">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5"/>
                                        <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className={`mobile-menu d-lg-none ${isMobileMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-menu-overlay" onClick={toggleMobileMenu}></div>
                    <div className="mobile-menu-content">
                        <div className="mobile-menu-header">
                            <Link legacyBehavior href="/">
                                <a className="mobile-logo">
                                    <img src="/logo-dosalga.png" alt="Dosalga" />
                                </a>
                            </Link>
                            <button className="close-mobile-menu" onClick={toggleMobileMenu}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                        <ul className="mobile-nav-menu">
                            <li>
                                <Link legacyBehavior href={isSpanish ? "/es/about-us" : "/about-us"}>
                                    <a onClick={toggleMobileMenu}>{isSpanish ? 'SOBRE NOSOTROS' : 'ABOUT US'}</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href={isSpanish ? "/es/services" : "/services"}>
                                    <a onClick={toggleMobileMenu}>{isSpanish ? 'SERVICIOS' : 'SERVICES'}</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior href={isSpanish ? "/es/contact" : "/contact"}>
                                    <a onClick={toggleMobileMenu}>{isSpanish ? 'CONTACTO' : 'CONTACT'}</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="mobile-menu-footer">
                            <div className="mobile-contact-info">
                                <p>Need Help? Call us</p>
                                <a href="tel:+33XXXXXXXXX">+33 X XX XX XX XX</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <style jsx>{`
                .uomo-header {
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    background: #fff;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                }

                .uomo-header.header-sticky {
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }

                .header-wrapper {
                    height: 80px;
                }

                .logo-img {
                    height: 34px;
                    width: auto;
                    display: block;
                }

                .mobile-logo img {
                    height: 28px;
                    width: auto;
                    display: block;
                }

                .nav-menu {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    gap: 40px;
                }

                .nav-menu li a {
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: #333;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    padding: 8px 0;
                    position: relative;
                }

                .nav-menu li a:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #000;
                    transition: width 0.3s ease;
                }

                .nav-menu li a:hover:after,
                .nav-menu li.active a:after {
                    width: 100%;
                }

                .nav-menu li a:hover,
                .nav-menu li.active a {
                    color: #000;
                }

                .header-actions {
                    gap: 20px;
                }

                .header-action-btn {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                    color: #333;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .header-action-btn:hover {
                    color: #000;
                    transform: scale(1.1);
                }

                .mobile-menu-toggle {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 8px;
                }

                .mobile-menu-toggle span {
                    width: 24px;
                    height: 2px;
                    background: #333;
                    transition: all 0.3s ease;
                }

                .mobile-menu-toggle.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }

                .mobile-menu-toggle.active span:nth-child(2) {
                    opacity: 0;
                }

                .mobile-menu-toggle.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }

                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.8);
                    z-index: 10000;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    padding-top: 100px;
                }

                .search-popup {
                    width: 100%;
                    max-width: 600px;
                    padding: 0 20px;
                    position: relative;
                }

                .close-search {
                    position: absolute;
                    top: -40px;
                    right: 20px;
                    background: none;
                    border: none;
                    color: #fff;
                    cursor: pointer;
                    padding: 8px;
                }

                .search-form {
                    position: relative;
                    width: 100%;
                }

                .search-form input {
                    width: 100%;
                    padding: 20px 60px 20px 20px;
                    border: none;
                    border-radius: 50px;
                    font-size: 16px;
                    outline: none;
                }

                .search-form button {
                    position: absolute;
                    right: 10px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: #000;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    color: #fff;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .mobile-menu {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 9999;
                    visibility: hidden;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .mobile-menu.active {
                    visibility: visible;
                    opacity: 1;
                }

                .mobile-menu-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                }

                .mobile-menu-content {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 300px;
                    height: 100%;
                    background: #fff;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    padding: 30px;
                    overflow-y: auto;
                }

                .mobile-menu.active .mobile-menu-content {
                    transform: translateX(0);
                }

                .mobile-menu-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 40px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                }

                .mobile-logo {
                    font-size: 24px;
                    font-weight: 800;
                    color: #000;
                    text-decoration: none;
                }

                .close-mobile-menu {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 8px;
                }

                .mobile-nav-menu {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .mobile-nav-menu li {
                    margin-bottom: 20px;
                }

                .mobile-nav-menu li a {
                    font-size: 16px;
                    font-weight: 600;
                    color: #333;
                    text-decoration: none;
                    display: block;
                    padding: 10px 0;
                    transition: color 0.3s ease;
                }

                .mobile-nav-menu li a:hover {
                    color: #000;
                }

                .mobile-menu-footer {
                    margin-top: 40px;
                    padding-top: 40px;
                    border-top: 1px solid #eee;
                }

                .mobile-contact-info p {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 8px;
                }

                .mobile-contact-info a {
                    font-size: 18px;
                    font-weight: 600;
                    color: #000;
                    text-decoration: none;
                }

                @media (max-width: 991px) {
                    .header-wrapper {
                        height: 70px;
                    }
                }
            `}</style>
        </>
    );
};

export default HeaderUomo;
