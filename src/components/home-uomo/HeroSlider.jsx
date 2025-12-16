import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            badge: "NEW ARRIVALS",
            title: "Modern Jogger",
            price: "399,50 TL",
            cta: "Shop Now",
            image: "/slider/shoe.png",
            alt: "Lifestyle activewear designed for everyday movement",
            bgColor: "#f7f7f7"
        },
        {
            id: 2,
            badge: "NEW ARRIVALS",
            title: "Modern Jogger",
            price: "399,50 TL",
            cta: "Shop Now",
            image: "/slider/gemini1.png",
            alt: "Comfortable activewear for real life",
            bgColor: "#f7f7f7"
        },
        {
            id: 3,
            badge: "NEW ARRIVALS",
            title: "Modern Jogger",
            price: "399,50 TL",
            cta: "Shop Now",
            image: "/slider/gemini2.png",
            alt: "Modern activewear worn in everyday environments",
            bgColor: "#f7f7f7"
        },
        {
            id: 4,
            badge: "NEW ARRIVALS",
            title: "Modern Jogger",
            price: "399,50 TL",
            cta: "Shop Now",
            image: "/slider/gemini3.png",
            alt: "Lifestyle activewear designed for everyday movement",
            bgColor: "#f7f7f7"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="hero-slider">
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundColor: slide.bgColor }}
                    >
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-5 col-md-6">
                                    <div className="slide-content">
                                        <span className="badge">{slide.badge}</span>
                                        <h1 className="title">{slide.title}</h1>
                                        <div className="price">{slide.price}</div>
                                        <Link legacyBehavior href="/shop">
                                            <a className="shop-link">{slide.cta}</a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-6">
                                    <div className="slide-image">
                                        <div className="slide-image-inner">
                                            <Image
                                                src={slide.image}
                                                alt={slide.alt}
                                                fill
                                                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 700px"
                                                priority={index === 0}
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="nav-btn prev-btn" onClick={prevSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>
                <button className="nav-btn next-btn" onClick={nextSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </button>

                <div className="dots">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hero-slider {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    background: #fff;
                }

                .slider-container {
                    position: relative;
                    width: 100%;
                    height: 650px;
                }

                .slide {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.6s ease-in-out;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f7f7f7 0%, #ffffff 70%);
                    overflow: hidden;
                }

                .slide.active {
                    opacity: 1;
                    visibility: visible;
                    z-index: 1;
                }

                .slide::before {
                    content: "";
                    position: absolute;
                    inset: -120px -80px;
                    background-image:
                        linear-gradient(120deg, rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(-120deg, rgba(0,0,0,0.02) 1px, transparent 1px);
                    background-size: 36px 36px;
                    opacity: 0.45;
                    z-index: 0;
                }

                .slide::after {
                    content: "";
                    position: absolute;
                    right: 6%;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 620px;
                    height: 620px;
                    background: radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0) 72%);
                    z-index: 0;
                }

                .slide-content {
                    padding: 60px 0;
                    position: relative;
                    z-index: 1;
                }

                .badge {
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

                .title {
                    font-size: 64px;
                    font-weight: 400;
                    line-height: 1.1;
                    color: #222;
                    margin-bottom: 20px;
                }

                .price {
                    font-size: 48px;
                    font-weight: 500;
                    color: #222;
                    margin-bottom: 30px;
                }

                .shop-link {
                    display: inline-block;
                    color: #222;
                    font-size: 16px;
                    font-weight: 500;
                    text-decoration: none;
                    border-bottom: 2px solid #222;
                    padding-bottom: 3px;
                    transition: all 0.3s ease;
                }

                .shop-link:hover {
                    color: #ffd700;
                    border-color: #ffd700;
                }

                .slide-image {
                    position: relative;
                    height: 650px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1;
                }

                .slide-image-inner {
                    position: relative;
                    width: 100%;
                    max-width: 820px;
                    height: 600px;
                }

                .slide-image :global(img) {
                    filter: drop-shadow(0 28px 50px rgba(0, 0, 0, 0.16));
                    transform: translateY(-10px);
                }

                .nav-btn {
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

                .nav-btn:hover {
                    background: #222;
                    border-color: #222;
                    color: #fff;
                }

                .prev-btn {
                    left: 30px;
                }

                .next-btn {
                    right: 30px;
                }

                .dots {
                    position: absolute;
                    bottom: 40px;
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
                    .slider-container {
                        height: 550px;
                    }

                    .title {
                        font-size: 48px;
                    }

                    .price {
                        font-size: 36px;
                    }

                    .slide-image {
                        height: 450px;
                    }

                    .slide-image-inner {
                        height: 400px;
                    }

                    .slide::after {
                        width: 420px;
                        height: 420px;
                        right: -10%;
                    }
                }

                @media (max-width: 768px) {
                    .slider-container {
                        height: auto;
                        min-height: 700px;
                    }

                    .slide-content {
                        padding: 40px 0;
                        text-align: center;
                    }

                    .title {
                        font-size: 36px;
                    }

                    .price {
                        font-size: 28px;
                    }

                    .slide-image {
                        height: 350px;
                        margin-bottom: 20px;
                    }

                    .slide-image-inner {
                        height: 300px;
                    }

                    .slide::after {
                        width: 320px;
                        height: 320px;
                        right: -20%;
                    }

                    .nav-btn {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
