import Link from 'next/link';
import React, { useState } from 'react';

const FooterUomo = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <footer className="uomo-footer">
            <div className="footer-main">
                <div className="container">
                    <div className="row g-4 g-lg-5">
                        {/* Logo & Info */}
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <Link legacyBehavior href="/">
                                    <a className="footer-logo">
                                        <img src="/logo2.jpg" alt="Dosalga" className="footer-logo-img" />
                                    </a>
                                </Link>
                                <p className="footer-description">
                                    Premium sportswear and active lifestyle products for everyone.
                                </p>
                                <div className="footer-contact">
                                    <p>
                                        <a href="mailto:contact@dosalga.store">contact@dosalga.store</a>
                                    </p>
                                </div>
                                <div className="footer-social">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M20 10C20 4.48 15.52 0 10 0S0 4.48 0 10c0 4.84 3.44 8.87 8 9.8V13H6v-3h2V7.5C8 5.57 9.57 4 11.5 4H14v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Company Links */}
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h6 className="footer-widget-title">COMPANY</h6>
                                <ul className="footer-links">
                                    <li><Link legacyBehavior href="/about-us"><a>About Us</a></Link></li>
                                    <li><Link legacyBehavior href="/services"><a>Services</a></Link></li>
                                    <li><Link legacyBehavior href="/contact"><a>Contact</a></Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Help Links */}
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h6 className="footer-widget-title">HELP</h6>
                                <ul className="footer-links">
                                    <li><Link legacyBehavior href="/my-account"><a>My Account</a></Link></li>
                                    
                                    <li><Link legacyBehavior href="/privacy-policy"><a>Legal & Privacy</a></Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h6 className="footer-widget-title">SUBSCRIBE</h6>
                                <p className="newsletter-text">
                                    Be the first to get the latest news about trends, promotions, and much more!
                                </p>
                                <form onSubmit={handleSubmit} className="newsletter-form">
                                    <div className="input-group">
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            placeholder="Your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <button type="submit" className="btn-submit">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <p className="copyright">©2025 Dosalga | Design By <a href="https://o7digital.com">o7Digital</a></p>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-methods">
                                <img src="/assets/img/home1/icon/visa.png" alt="Visa" />
                                <img src="/assets/img/home1/icon/mastercard.png" alt="Mastercard" />
                                <img src="/assets/img/home1/icon/american-express.png" alt="American Express" />
                                <img src="/assets/img/home1/icon/maestro.png" alt="Maestro" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .uomo-footer {
                    background: #bcbcbc;
                    color: #000;
                    border-top: 3px solid #d20000;
                }

                .footer-main {
                    padding: 80px 0 40px;
                }

                .footer-logo {
                    display: inline-block;
                    margin-bottom: 20px;
                }

                .footer-logo-img {
                    height: 108px;
                    width: auto;
                    display: block;
                }

                .footer-description {
                    font-size: 14px;
                    color: #111;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .footer-contact p {
                    font-size: 14px;
                    color: #111;
                    margin-bottom: 12px;
                    line-height: 1.6;
                }

                .footer-contact a {
                    color: #000;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-contact a:hover {
                    color: #d20000;
                }

                .footer-social {
                    display: flex;
                    gap: 15px;
                    margin-top: 20px;
                }

                .footer-social a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: rgba(0,0,0,0.08);
                    border-radius: 50%;
                    color: #000;
                    transition: all 0.3s ease;
                }

                .footer-social a:hover {
                    background: #d20000;
                    color: #fff;
                    transform: translateY(-2px);
                }

                .footer-widget-title {
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #000;
                    margin-bottom: 24px;
                }

                .footer-links {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .footer-links li {
                    margin-bottom: 12px;
                }

                .footer-links a {
                    font-size: 14px;
                    color: #111;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .footer-links a:hover {
                    color: #d20000;
                    transform: translateX(4px);
                }

                .newsletter-text {
                    font-size: 14px;
                    color: #111;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .newsletter-form {
                    margin-bottom: 24px;
                }

                .input-group {
                    position: relative;
                    display: flex;
                }

                .form-control {
                    flex: 1;
                    padding: 12px 50px 12px 16px;
                    border: 1px solid rgba(0,0,0,0.3);
                    background: rgba(255,255,255,0.9);
                    color: #000;
                    border-radius: 50px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-control:focus {
                    border-color: #d20000;
                    background: #fff;
                }

                .form-control::placeholder {
                    color: #555;
                }

                .btn-submit {
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: #000;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-submit:hover {
                    background: #d20000;
                }

                .app-download {
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .app-download img {
                    height: 40px;
                    width: auto;
                    border-radius: 6px;
                    transition: transform 0.3s ease;
                }

                .app-download a:hover img {
                    transform: scale(1.05);
                }

                .footer-bottom {
                    padding: 24px 0;
                    border-top: 1px solid rgba(0,0,0,0.12);
                }

                .copyright {
                    font-size: 14px;
                    color: #111;
                    margin: 0;
                }

                .copyright a {
                    color: #000;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .copyright a:hover {
                    color: #d20000;
                }

                .payment-methods {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    flex-wrap: wrap;
                }

                .payment-methods img {
                    height: 24px;
                    width: auto;
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }

                .payment-methods img:hover {
                    opacity: 1;
                }

                @media (max-width: 991px) {
                    .footer-main {
                        padding: 60px 0 30px;
                    }

                    .footer-widget {
                        margin-bottom: 40px;
                    }
                }

                @media (max-width: 767px) {
                    .copyright,
                    .payment-methods {
                        text-align: center;
                        justify-content: center;
                        margin-bottom: 16px;
                    }
                }
            `}</style>
        </footer>
    );
};

export default FooterUomo;
