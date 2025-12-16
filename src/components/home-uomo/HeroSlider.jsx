import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const HeroSlider = () => {
    const router = useRouter();
    const isSpanish = router.pathname.startsWith('/es');
    const slides = isSpanish
        ? [
            {
                id: 1,
                badge: "NUEVAS LLEGADAS",
                title: "Activewear diseñado para la vida real",
                subtitle: "Comodidad, sencillez y movimiento para tus rutinas diarias.",
                cta: "Comprar esenciales",
                image: "/slider/gemini1.png",
                alt: "Ropa activa para la vida cotidiana"
            },
            {
                id: 2,
                badge: "NUEVAS LLEGADAS",
                title: "Muévete por tu día con facilidad",
                subtitle: "Activewear versátil pensado para tu estilo de vida, no solo el gimnasio.",
                cta: "Descubrir la colección",
                image: "/slider/gemini2.png",
                alt: "Activewear versátil para tu día"
            },
            {
                id: 3,
                badge: "NUEVAS LLEGADAS",
                title: "Comodidad dondequiera que vayas",
                subtitle: "Capas ligeras y esenciales diarios para moverte de verdad.",
                cta: "Explora Dosalga",
                image: "/slider/gemini3.png",
                alt: "Activewear cómodo en entornos reales"
            }
          ]
        : [
            {
                id: 1,
                badge: "NEW ARRIVALS",
                title: "Activewear Designed for Real Life",
                subtitle: "Comfort, simplicity, and movement for everyday routines.",
                cta: "Shop Essentials",
                image: "/slider/gemini1.png",
                alt: "Lifestyle activewear designed for real life"
            },
            {
                id: 2,
                badge: "NEW ARRIVALS",
                title: "Move Through Your Day With Ease",
                subtitle: "Versatile activewear made to fit your lifestyle, not the gym.",
                cta: "Discover the Collection",
                image: "/slider/gemini2.png",
                alt: "Everyday activewear for modern lifestyles"
            },
            {
                id: 3,
                badge: "NEW ARRIVALS",
                title: "Comfort That Goes Wherever You Do",
                subtitle: "Light layers and everyday essentials for real movement.",
                cta: "Explore Dosalga",
                image: "/slider/gemini3.png",
                alt: "Comfortable activewear in real environments"
            }
          ];
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="hero-slider">
            <div className="slider-container">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                    >
                        <div className="slide-media">
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                            <div className="media-overlay" />
                        </div>

                        <div className="slide-content">
                            <div className="content-inner">
                                <span className="badge">{slide.badge}</span>
                                <h1 className="title">{slide.title}</h1>
                                {slide.subtitle && <p className="subtitle">{slide.subtitle}</p>}
                                <Link legacyBehavior href="/shop">
                                    <a className="shop-link">{slide.cta}</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

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
                    width: 100vw;
                    overflow: hidden;
                    background: #000;
                }

                .slider-container {
                    position: relative;
                    width: 100vw;
                    min-height: 90vh;
                }

                .slide {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.6s ease-in-out;
                    overflow: hidden;
                }

                .slide.active {
                    opacity: 1;
                    visibility: visible;
                    z-index: 1;
                }

                .slide-media {
                    position: absolute;
                    inset: 0;
                    z-index: 0;
                }

                .media-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(120deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 35%, rgba(0,0,0,0.22) 65%, rgba(0,0,0,0.1) 100%);
                }

                .slide-content {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding: 80px clamp(24px, 6vw, 80px);
                }

                .content-inner {
                    max-width: 520px;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                .badge {
                    display: inline-block;
                    padding: 8px 20px;
                    background: rgba(255,255,255,0.14);
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    border-radius: 20px;
                    border: 1px solid rgba(255,255,255,0.2);
                    width: fit-content;
                }

                .title {
                    font-size: clamp(42px, 6vw, 68px);
                    font-weight: 500;
                    line-height: 1.05;
                    margin: 0;
                    color: #fff;
                }

                .subtitle {
                    font-size: clamp(16px, 2.6vw, 20px);
                    color: rgba(255,255,255,0.9);
                    margin: 6px 0 12px;
                    line-height: 1.5;
                }

                .shop-link {
                    display: inline-block;
                    color: #fff;
                    font-size: 16px;
                    font-weight: 500;
                    text-decoration: none;
                    border-bottom: 2px solid rgba(255,255,255,0.9);
                    padding-bottom: 3px;
                    transition: all 0.3s ease;
                    width: fit-content;
                }

                .shop-link:hover {
                    color: #ffd700;
                    border-color: #ffd700;
                }

                .dots {
                    position: absolute;
                    bottom: 26px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 8px;
                    z-index: 10;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(0, 0, 0, 0.25);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .dot:hover {
                    background: rgba(255, 255, 255, 0.7);
                }

                .dot.active {
                    background: #f8f8f8;
                    width: 28px;
                    border-radius: 6px;
                }

                @media (max-width: 1200px) {
                    .slider-container {
                        min-height: 85vh;
                    }
                }

                @media (max-width: 768px) {
                    .slider-container {
                        min-height: 80vh;
                    }

                    .slide-content {
                        padding: 60px 22px;
                    }

                    .content-inner {
                        max-width: 360px;
                        gap: 14px;
                    }

                    .title {
                        font-size: clamp(32px, 8vw, 44px);
                    }

                    .price {
                        font-size: clamp(22px, 6vw, 30px);
                    }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
