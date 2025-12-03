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
                                    <p>1418 River Drive, Suite 35<br />Cottonhall, CA 9622<br />United States</p>
                                    <p>
                                        <a href="mailto:contact@dosalga.mx">contact@dosalga.mx</a>
                                    </p>
                                    <p>
                                        <a href="tel:+33XXXXXXXXX">+33 X XX XX XX XX</a>
                                    </p>
                                </div>
                                <div className="footer-social">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M20 10C20 4.48 15.52 0 10 0S0 4.48 0 10c0 4.84 3.44 8.87 8 9.8V13H6v-3h2V7.5C8 5.57 9.57 4 11.5 4H14v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                                        </svg>
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84"/>
                                        </svg>
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 0C7.28 0 6.94 0 5.88.05 4.82.1 4.07.28 3.42.53A4.92 4.92 0 0 0 1.67 1.68 4.92 4.92 0 0 0 .53 3.43C.27 4.08.1 4.83.05 5.89 0 6.95 0 7.29 0 10.01c0 2.72 0 3.06.05 4.12.05 1.06.23 1.81.48 2.46.26.63.61 1.17 1.15 1.71.54.54 1.08.89 1.71 1.15.65.25 1.4.43 2.46.48 1.06.05 1.4.05 4.12.05 2.72 0 3.06 0 4.12-.05 1.06-.05 1.81-.23 2.46-.48a4.92 4.92 0 0 0 1.71-1.15c.54-.54.89-1.08 1.15-1.71.25-.65.43-1.4.48-2.46.05-1.06.05-1.4.05-4.12 0-2.72 0-3.06-.05-4.12-.05-1.06-.23-1.81-.48-2.46a4.92 4.92 0 0 0-1.15-1.71 4.92 4.92 0 0 0-1.71-1.15c-.65-.25-1.4-.43-2.46-.48C13.06 0 12.72 0 10 0zm0 1.8c2.67 0 2.99 0 4.04.05.98.05 1.5.22 1.86.37.47.18.8.4 1.15.75.35.35.57.68.75 1.15.15.36.32.88.37 1.86.05 1.05.05 1.37.05 4.04 0 2.67 0 2.99-.05 4.04-.05.98-.22 1.5-.37 1.86-.18.47-.4.8-.75 1.15-.35.35-.68.57-1.15.75-.36.15-.88.32-1.86.37-1.05.05-1.37.05-4.04.05-2.67 0-2.99 0-4.04-.05-.98-.05-1.5-.22-1.86-.37a3.1 3.1 0 0 1-1.15-.75 3.1 3.1 0 0 1-.75-1.15c-.15-.36-.32-.88-.37-1.86C1.8 13 1.8 12.68 1.8 10.01c0-2.67 0-2.99.05-4.04.05-.98.22-1.5.37-1.86.18-.47.4-.8.75-1.15.35-.35.68-.57 1.15-.75.36-.15.88-.32 1.86-.37C7.01 1.8 7.33 1.8 10 1.8zm0 3.07a5.13 5.13 0 1 0 0 10.26 5.13 5.13 0 0 0 0-10.26zM10 13.34A3.34 3.34 0 1 1 10 6.68a3.34 3.34 0 0 1 0 6.66zm6.54-8.46a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
                                        </svg>
                                    </a>
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M19.59 6.69a2.5 2.5 0 0 0-1.76-1.77C16.25 4.5 10 4.5 10 4.5s-6.25 0-7.83.42A2.5 2.5 0 0 0 .41 6.69 26.28 26.28 0 0 0 0 10a26.28 26.28 0 0 0 .41 3.31 2.5 2.5 0 0 0 1.76 1.77c1.58.42 7.83.42 7.83.42s6.25 0 7.83-.42a2.5 2.5 0 0 0 1.76-1.77A26.28 26.28 0 0 0 20 10a26.28 26.28 0 0 0-.41-3.31zM8 12.5V7.5L13 10l-5 2.5z"/>
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
                                    <li><Link legacyBehavior href="/about-us"><a>Affiliates</a></Link></li>
                                    <li><Link legacyBehavior href="/blog-grid"><a>Blog</a></Link></li>
                                    <li><Link legacyBehavior href="/contact"><a>Contact Us</a></Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Shop Links */}
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h6 className="footer-widget-title">SHOP</h6>
                                <ul className="footer-links">
                                    <li><Link legacyBehavior href="/shop"><a>New Arrivals</a></Link></li>
                                    <li><Link legacyBehavior href="/shop"><a>Accessories</a></Link></li>
                                    <li><Link legacyBehavior href="/shop?category=men"><a>Men</a></Link></li>
                                    <li><Link legacyBehavior href="/shop?category=women"><a>Women</a></Link></li>
                                    <li><Link legacyBehavior href="/shop"><a>Shop All</a></Link></li>
                                </ul>
                            </div>
                        </div>

                        {/* Help Links */}
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="footer-widget">
                                <h6 className="footer-widget-title">HELP</h6>
                                <ul className="footer-links">
                                    <li><Link legacyBehavior href="/about-us"><a>Customer Service</a></Link></li>
                                    <li><Link legacyBehavior href="/my-account"><a>My Account</a></Link></li>
                                    
                                    <li><Link legacyBehavior href="/privacy-policy"><a>Legal & Privacy</a></Link></li>
                                    <li><Link legacyBehavior href="/contact"><a>Contact</a></Link></li>
                                    <li><Link legacyBehavior href="/gift-card"><a>Gift Card</a></Link></li>
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
                    background: #222;
                    color: #fff;
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
                    color: #999;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }

                .footer-contact p {
                    font-size: 14px;
                    color: #999;
                    margin-bottom: 12px;
                    line-height: 1.6;
                }

                .footer-contact a {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-contact a:hover {
                    color: #ddd;
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
                    background: rgba(255,255,255,0.1);
                    border-radius: 50%;
                    color: #fff;
                    transition: all 0.3s ease;
                }

                .footer-social a:hover {
                    background: #fff;
                    color: #222;
                    transform: translateY(-2px);
                }

                .footer-widget-title {
                    font-size: 14px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    color: #fff;
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
                    color: #999;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .footer-links a:hover {
                    color: #fff;
                    transform: translateX(4px);
                }

                .newsletter-text {
                    font-size: 14px;
                    color: #999;
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
                    border: 1px solid rgba(255,255,255,0.2);
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    border-radius: 50px;
                    font-size: 14px;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .form-control:focus {
                    border-color: #fff;
                    background: rgba(255,255,255,0.1);
                }

                .form-control::placeholder {
                    color: #999;
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
                    background: #fff;
                    color: #222;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-submit:hover {
                    background: #ddd;
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
                    border-top: 1px solid rgba(255,255,255,0.1);
                }

                .copyright {
                    font-size: 14px;
                    color: #999;
                    margin: 0;
                }

                .copyright a {
                    color: #fff;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .copyright a:hover {
                    color: #ddd;
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
                    opacity: 0.6;
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
