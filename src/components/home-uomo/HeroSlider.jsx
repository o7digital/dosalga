import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const slides = [
        {
            id: 1,
            subtitle: "New Collection 2025",
            title: "Sports & Active Wear",
            description: "Discover our latest collection of premium sportswear designed for performance and style.",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fgrid_banner_1.jpg&w=1920&q=75",
            bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        },
        {
            id: 2,
            subtitle: "Premium Quality",
            title: "Performance Ready",
            description: "Engineered for athletes, designed for champions. Push your limits with confidence.",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fgrid_banner_2.jpg&w=1920&q=75",
            bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
        },
        {
            id: 3,
            subtitle: "Best Sellers",
            title: "Fitness & Lifestyle",
            description: "From gym to street, elevate your style with our versatile collection.",
            image: "https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fhome%2Fdemo10%2Fgrid_banner_3.jpg&w=1920&q=75",
            bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
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
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''} ${
                            index === currentSlide - 1 || (currentSlide === 0 && index === slides.length - 1)
                                ? 'prev'
                                : ''
                        } ${
                            index === currentSlide + 1 || (currentSlide === slides.length - 1 && index === 0)
                                ? 'next'
                                : ''
                        }`}
                        style={{ background: slide.bgColor }}
                    >
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-lg-6">
                                    <div className="hero-content">
                                        <span className="hero-subtitle">{slide.subtitle}</span>
                                        <h1 className="hero-title">
                                            {slide.title.split(' ').map((word, i, arr) => (
                                                <React.Fragment key={i}>
                                                    {word}
                                                    {i === Math.floor(arr.length / 2) - 1 && <br />}
                                                    {i !== arr.length - 1 && ' '}
                                                </React.Fragment>
                                            ))}
                                        </h1>
                                        <p className="hero-description">{slide.description}</p>
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
                                        <img src={slide.image} alt={slide.title} className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="slider-arrow prev-arrow" onClick={prevSlide} aria-label="Previous slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button className="slider-arrow next-arrow" onClick={nextSlide} aria-label="Next slide">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>

                <div className="slider-indicators">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            className={`indicator ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .hero-slider-section {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                }

                .slider-container {
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
                    transition: opacity 0.8s ease-in-out, transform 0.8s ease-in-out;
                    transform: scale(0.95);
                }

                .hero-slide.active {
                    opacity: 1;
                    z-index: 2;
                    transform: scale(1);
                }

                .hero-slide.prev,
                .hero-slide.next {
                    opacity: 0;
                    z-index: 1;
                }

                .hero-content {
                    z-index: 3;
                    position: relative;
                }

                .hero-subtitle {
                    display: inline-block;
                    font-size: 14px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 15px;
                    padding: 8px 20px;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 30px;
                }

                .hero-title {
                    font-size: 72px;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 25px;
                    color: #fff;
                    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                }

                .hero-description {
                    font-size: 18px;
                    line-height: 1.8;
                    margin-bottom: 35px;
                    color: rgba(255, 255, 255, 0.95);
                    max-width: 500px;
                }

                .hero-actions {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .btn-primary,
                .btn-secondary {
                    display: inline-block;
                    padding: 16px 40px;
                    font-size: 16px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .btn-primary {
                    background: #fff;
                    color: #000;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                }

                .btn-primary:hover {
                    background: #f0f0f0;
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
                }

                .btn-secondary {
                    background: transparent;
                    color: #fff;
                    border: 2px solid rgba(255, 255, 255, 0.5);
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.2);
                    border-color: #fff;
                    transform: translateY(-3px);
                }

                .hero-image {
                    position: relative;
                    z-index: 2;
                }

                .hero-image img {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: float 6s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-20px);
                    }
                }

                .slider-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 10;
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    color: #fff;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .slider-arrow:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-50%) scale(1.1);
                }

                .prev-arrow {
                    left: 30px;
                }

                .next-arrow {
                    right: 30px;
                }

                .slider-indicators {
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 12px;
                    z-index: 10;
                }

                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.4);
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .indicator:hover {
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(1.2);
                }

                .indicator.active {
                    background: #fff;
                    width: 40px;
                    border-radius: 10px;
                }

                @media (max-width: 992px) {
                    .slider-container {
                        height: 500px;
                    }

                    .hero-title {
                        font-size: 48px;
                    }

                    .hero-description {
                        font-size: 16px;
                    }

                    .slider-arrow {
                        width: 40px;
                        height: 40px;
                    }

                    .prev-arrow {
                        left: 15px;
                    }

                    .next-arrow {
                        right: 15px;
                    }
                }

                @media (max-width: 768px) {
                    .slider-container {
                        height: 700px;
                    }

                    .hero-title {
                        font-size: 36px;
                    }

                    .hero-content {
                        text-align: center;
                        margin-bottom: 30px;
                    }

                    .hero-actions {
                        justify-content: center;
                    }

                    .slider-arrow {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
