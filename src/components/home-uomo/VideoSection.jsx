import React, { useState } from 'react';
import Link from 'next/link';

const VideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section className="video-section">
            <div className="video-wrapper">
                <div className="video-overlay"></div>
                <div 
                    className="video-background"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="play-button-wrapper">
                        <button 
                            className="play-button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            aria-label="Play video"
                        >
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                <circle cx="30" cy="30" r="28" stroke="white" strokeWidth="2"/>
                                <path d="M24 20L40 30L24 40V20Z" fill="white"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div className="video-content">
                    <div className="container">
                        <div className="content-wrapper">
                            <h2 className="studio-brand">DOSALGA</h2>
                            <h1 className="studio-title">Studio Collection</h1>
                            <p className="studio-subtitle">Low impact for the high powered.</p>
                            <Link legacyBehavior href="/shop">
                                <a className="btn-shop-now">Shop Now</a>
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
                }

                .video-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.3);
                    z-index: 2;
                }

                .play-button-wrapper {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 3;
                }

                .play-button {
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .play-button:hover {
                    transform: scale(1.1);
                }

                .play-button svg {
                    filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.3));
                }

                .video-content {
                    position: absolute;
                    bottom: 80px;
                    left: 0;
                    width: 100%;
                    z-index: 4;
                }

                .content-wrapper {
                    max-width: 600px;
                    color: #fff;
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
