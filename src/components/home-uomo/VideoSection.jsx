import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const VideoSection = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const { pathname } = useRouter();
    const lang = (() => {
        const code = pathname.split('/')[1];
        const supported = ['en', 'es', 'de', 'fr', 'it', 'pt'];
        return supported.includes(code) ? code : 'en';
    })();
    const text = {
        en: { title: 'Studio Collection', subtitle: 'Low impact for the high powered.', cta: 'Shop Now' },
        es: { title: 'Colección Studio', subtitle: 'Impacto ligero para un día con energía.', cta: 'Comprar ahora' },
        de: { title: 'Studio Kollektion', subtitle: 'Leichte Wirkung für viel Power.', cta: 'Jetzt kaufen' },
        fr: { title: 'Collection Studio', subtitle: 'Impact léger pour une journée pleine d’énergie.', cta: 'Shopper' },
        it: { title: 'Collezione Studio', subtitle: 'Impatto leggero per chi va al massimo.', cta: 'Acquista ora' },
        pt: { title: 'Coleção Studio', subtitle: 'Impacto leve para um dia cheio de energia.', cta: 'Comprar agora' },
    }[lang];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);

        video.addEventListener('play', onPlay);
        video.addEventListener('pause', onPause);

        return () => {
            video.removeEventListener('play', onPlay);
            video.removeEventListener('pause', onPause);
        };
    }, []);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    };

    return (
        <section className="video-section">
            <div className="video-wrapper">
                <div className="video-overlay" />

                <video
                    ref={videoRef}
                    className="video-background"
                    poster="/assets/images/home/demo10/slideshow-character1.png"
                    preload="metadata"
                    playsInline
                    muted
                >
                    <source src="/assets/videos/video_1.mp4" type="video/mp4" />
                </video>

                <button
                    className={`play-button ${isPlaying ? 'playing' : ''}`}
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                    <span className="play-icon">
                        <svg width="26" height="32" viewBox="0 0 26 32" fill="none">
                            {isPlaying ? (
                                <g stroke="white" strokeWidth="3" strokeLinecap="round">
                                    <line x1="7" y1="4" x2="7" y2="28" />
                                    <line x1="19" y1="4" x2="19" y2="28" />
                                </g>
                            ) : (
                                <path d="M24 16L4 28V4L24 16Z" fill="white" />
                            )}
                        </svg>
                    </span>
                </button>

                <div className="video-content">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2 className="studio-brand">DOSALGA</h2>
                            <h1 className="studio-title">{text.title}</h1>
                            <p className="studio-subtitle">{text.subtitle}</p>
                            <Link legacyBehavior href={lang === 'en' ? "/shop" : `/${lang}/shop`}>
                                <a className="btn-shop-now">{text.cta}</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .video-section {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    margin: 80px 0;
                }

                .video-wrapper {
                    position: relative;
                    width: 100%;
                    height: 700px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
                }

                .video-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    object-fit: cover;
                }

                .video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%);
                    z-index: 2;
                }

                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 86px;
                    height: 86px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.14);
                    border: 2px solid rgba(255, 255, 255, 0.4);
                    display: grid;
                    place-items: center;
                    z-index: 3;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    backdrop-filter: blur(4px);
                }

                .play-button:hover {
                    transform: translate(-50%, -50%) scale(1.05);
                    border-color: rgba(255, 255, 255, 0.8);
                    background: rgba(255, 255, 255, 0.2);
                }

                .play-button.playing {
                    background: rgba(0, 0, 0, 0.25);
                    border-color: rgba(255, 255, 255, 0.75);
                }

                .play-icon svg {
                    filter: drop-shadow(0 6px 20px rgba(0,0,0,0.45));
                }

                .video-content {
                    position: absolute;
                    bottom: 70px;
                    left: 0;
                    width: 100%;
                    z-index: 4;
                }

                .content-wrapper {
                    max-width: 600px;
                    color: #fff;
                    padding-left: 20px;
                }

                .studio-brand {
                    font-size: 18px;
                    font-weight: 700;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    margin-bottom: 10px;
                    color: #fff;
                }

                .studio-title {
                    font-size: 56px;
                    font-weight: 400;
                    line-height: 1.2;
                    margin-bottom: 15px;
                    color: #fff;
                }

                .studio-subtitle {
                    font-size: 18px;
                    line-height: 1.6;
                    margin-bottom: 30px;
                    color: rgba(255, 255, 255, 0.9);
                }

                .btn-shop-now {
                    display: inline-block;
                    padding: 14px 45px;
                    background: #ffd700;
                    color: #000;
                    font-size: 14px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border-radius: 30px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-shop-now:hover {
                    background: #ffed4e;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
                }

                @media (max-width: 992px) {
                    .video-wrapper {
                        height: 600px;
                    }

                    .studio-title {
                        font-size: 42px;
                    }

                    .video-content {
                        bottom: 60px;
                    }
                }

                @media (max-width: 768px) {
                    .video-section {
                        margin: 60px 0;
                    }

                    .video-wrapper {
                        height: 500px;
                    }

                    .studio-title {
                        font-size: 32px;
                    }

                    .studio-subtitle {
                        font-size: 16px;
                    }

                    .video-content {
                        bottom: 40px;
                    }

                    .content-wrapper {
                        text-align: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default VideoSection;
