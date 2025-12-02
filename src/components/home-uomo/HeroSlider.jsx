import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            badge: "NEW ARRIVALS",
            title: "Modern Jogger",
            price: "399,50 TL",
            description: "Shop Now",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fproduct_1.jpg&w=1920&q=75",
            bgColor: "#f5f5f5",
            textAlign: "left"
        },
        {
            id: 2,
            badge: "BEST SELLERS",
            title: "Fitness & Lifestyle",
            price: "",
            description: "From gym to street, elevate your style with our versatile collection.",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fgrid_banner_3.jpg&w=1920&q=75",
            bgColor: "#e8f4f8",
            textAlign: "left"
        },
        {
            id: 3,
            badge: "PREMIUM QUALITY",
            title: "Performance Ready",
            price: "",
            description: "Engineered for athletes, designed for champions.",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fgrid_banner_1.jpg&w=1920&q=75",
            bgColor: "#fff9f0",
            textAlign: "left"
        }
    ];

    useEffect(() => {
        if (!isAutoPlaying) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <section className="hero-slider-section">
            <div className="slider-wrapper">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 order-lg-1 order-2">
                                    <div className="hero-content">
                                        <span className="hero-badge">{slide.badge}</span>
                                        <h1 className="hero-title">{slide.title}</h1>
                                        {slide.price && (
                                            <div className="hero-price">{slide.price}</div>
                                        )}
                                        <p className="hero-description">{slide.description}</p>
                                        <div className="hero-actions">
                                            <Link legacyBehavior href="/shop">
                                                <a className="btn-shop-now">Shop Now</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-7 order-lg-2 order-1">
                                    <div className="hero-image-wrapper">
                                        <img 
                                            src={slide.image} 
                                            alt={slide.title}
                                            className="hero-image"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="slider-nav prev-nav" onClick={prevSlide} aria-label="Previous">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="slider-nav next-nav" onClick={nextSlide} aria-label="Next">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hero-slider-section {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: #fff;
                }

                .slider-wrapper {
                    position: relative;
                    width: 100%;
                    height: 600px;
                }

                .hero-slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.6s ease-in-out, visibility 0.6s ease-in-out;
                    display: flex;
                    align-items: center;
                }

                .hero-slide.active {
                    opacity: 1;
                    visibility: visible;
                    z-index: 1;
                }

                .hero-content {
                    padding: 60px 0;
                }

                .hero-badge {
                    display: inline-block;
                    padding: 8px 20px;
                    background: #ffd700;
                    color: #000;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    border-radius: 20px;
                    margin-bottom: 20px;
                }

                .hero-title {
                    font-size: 64px;
                    font-weight: 400;
                    line-height: 1.1;
                    color: #222;
                    margin-bottom: 15px;
                    font-family: 'Jost', sans-serif;
                }

                .hero-price {
                    font-size: 48px;
                    font-weight: 500;
                    color: #222;
                    margin-bottom: 25px;
                }

                .hero-description {
                    font-size: 16px;
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 35px;
                    max-width: 450px;
                }

                .hero-actions {
                    display: flex;
                    gap: 15px;
                }

                .btn-shop-now {
                    display: inline-block;
                    padding: 14px 45px;
                    background: #222;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-radius: 0;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 2px solid #222;
                }

                .btn-shop-now:hover {
                    background: #000;
                    border-color: #000;
                    transform: translateY(-2px);
                }

                .hero-image-wrapper {
                    position: relative;
                    height: 600px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .hero-image {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    object-position: center;
                }

                .slider-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid #ddd;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: #222;
                }

                .slider-nav:hover {
                    background: #222;
                    border-color: #222;
                    color: #fff;
                }

                .prev-nav {
                    left: 30px;
                }

                .next-nav {
                    right: 30px;
                }

                .slider-dots {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 10px;
                    z-index: 10;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.2);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .dot:hover {
                    background: rgba(0, 0, 0, 0.4);
                }

                .dot.active {
                    background: #222;
                    width: 30px;
                    border-radius: 5px;
                }

                @media (max-width: 992px) {
                    .slider-wrapper {
                        height: 500px;
                    }

                    .hero-title {
                        font-size: 48px;
                    }

                    .hero-price {
                        font-size: 36px;
                    }

                    .hero-image-wrapper {
                        height: 400px;
                    }

                    .slider-nav {
                        width: 40px;
                        height: 40px;
                    }

                    .prev-nav {
                        left: 15px;
                    }

                    .next-nav {
                        right: 15px;
                    }
                }

                @media (max-width: 768px) {
                    .slider-wrapper {
                        height: auto;
                        min-height: 600px;
                    }

                    .hero-content {
                        padding: 30px 0;
                        text-align: center;
                    }

                    .hero-title {
                        font-size: 36px;
                    }

                    .hero-price {
                        font-size: 28px;
                    }

                    .hero-description {
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .hero-actions {
                        justify-content: center;
                    }

                    .hero-image-wrapper {
                        height: 300px;
                        margin-bottom: 20px;
                    }

                    .slider-nav {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
