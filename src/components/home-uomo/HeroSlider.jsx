import React from 'react';
import Link from 'next/link';

const HeroSlider = () => {
    return (
        <section className="hero-slider-section">
            <div className="hero-slide">
                <div className="container h-100">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-6">
                            <div className="hero-content">
                                <span className="hero-subtitle">New Collection</span>
                                <h1 className="hero-title">
                                    Sports & <br />
                                    Active Wear
                                </h1>
                                <p className="hero-description">
                                    Discover our latest collection of premium sportswear 
                                    designed for performance and style.
                                </p>
                                <div className="hero-actions">
                                    <Link legacyBehavior href="/shop">
                                        <a className="btn-primary">Shop Now</a>
                                    </Link>
                                    <Link legacyBehavior href="/about-us">
                                        <a className="btn-secondary">Learn More</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image">
                                <img 
                                    src="/assets/img/home1/banner-img.png" 
                                    alt="Hero"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .hero-slider-section {
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    min-height: 600px;
                    display: flex;
                    align-items: center;
                    padding: 80px 0;
                }

                .hero-content {
                    padding-right: 40px;
                }

                .hero-subtitle {
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: #666;
                    margin-bottom: 20px;
                }

                .hero-title {
                    font-size: 64px;
                    font-weight: 800;
                    line-height: 1.1;
                    color: #000;
                    margin-bottom: 24px;
                }

                .hero-description {
                    font-size: 18px;
                    color: #666;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .hero-actions {
                    display: flex;
                    gap: 20px;
                    flex-wrap: wrap;
                }

                .btn-primary,
                .btn-secondary {
                    display: inline-block;
                    padding: 16px 40px;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    text-decoration: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }

                .btn-primary {
                    background: #000;
                    color: #fff;
                }

                .btn-primary:hover {
                    background: #333;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                }

                .btn-secondary {
                    background: transparent;
                    color: #000;
                    border: 2px solid #000;
                }

                .btn-secondary:hover {
                    background: #000;
                    color: #fff;
                }

                .hero-image {
                    text-align: center;
                    animation: float 3s ease-in-out infinite;
                }

                .hero-image img {
                    max-width: 100%;
                    height: auto;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                @media (max-width: 991px) {
                    .hero-slider-section {
                        min-height: auto;
                        padding: 60px 0;
                    }

                    .hero-title {
                        font-size: 42px;
                    }

                    .hero-content {
                        padding-right: 0;
                        margin-bottom: 40px;
                        text-align: center;
                    }

                    .hero-actions {
                        justify-content: center;
                    }
                }

                @media (max-width: 576px) {
                    .hero-title {
                        font-size: 32px;
                    }

                    .btn-primary,
                    .btn-secondary {
                        padding: 12px 30px;
                        font-size: 13px;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
