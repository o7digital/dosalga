import React from 'react';
import Link from 'next/link';

const UomoStudioCollection = () => {
    const collections = [
        {
            id: 1,
            title: 'Low impact for the high powered',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop',
            featured: true
        },
        {
            id: 2,
            title: 'Leggings',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop'
        },
        {
            id: 3,
            title: 'Jackets & Coats',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop'
        },
        {
            id: 4,
            title: 'Fitness & Yoga',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop'
        }
    ];

    return (
        <section className="uomo-studio-section py-5">
            <div className="container">
                <div className="section-header text-center mb-5">
                    <h2 className="section-title">DOSALGA Studio Collection</h2>
                </div>

                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="collection-card featured">
                            <div className="collection-image">
                                <img 
                                    src={collections[0].image} 
                                    alt={collections[0].title}
                                    className="img-fluid"
                                />
                            </div>
                            <div className="collection-content">
                                <h3>{collections[0].title}</h3>
                                <Link legacyBehavior href={collections[0].link}>
                                    <a className="shop-now-btn">
                                        Shop Now
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="row g-4">
                            {collections.slice(1).map((collection) => (
                                <div key={collection.id} className="col-md-6">
                                    <div className="collection-card">
                                        <div className="collection-image">
                                            <img 
                                                src={collection.image} 
                                                alt={collection.title}
                                                className="img-fluid"
                                            />
                                        </div>
                                        <div className="collection-content">
                                            <h4>{collection.title}</h4>
                                        </div>
                                        <Link legacyBehavior href={collection.link}>
                                            <a className="overlay-link"></a>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .uomo-studio-section {
                    background: #fff;
                }

                .section-title {
                    font-size: 36px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    color: #000;
                    margin: 0;
                }

                .collection-card {
                    position: relative;
                    overflow: hidden;
                    border-radius: 12px;
                    height: 100%;
                    min-height: 300px;
                    transition: all 0.3s ease;
                }

                .collection-card.featured {
                    min-height: 620px;
                }

                .collection-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 12px 28px rgba(0,0,0,0.15);
                }

                .collection-image {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .collection-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .collection-card:hover .collection-image img {
                    transform: scale(1.1);
                }

                .collection-content {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 40px;
                    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
                    color: #fff;
                    z-index: 2;
                }

                .collection-content h3 {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .collection-content h4 {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0;
                }

                .shop-now-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 12px 30px;
                    background: #fff;
                    color: #000;
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }

                .shop-now-btn:hover {
                    background: #000;
                    color: #fff;
                    transform: translateX(4px);
                }

                .overlay-link {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                }

                @media (max-width: 991px) {
                    .section-title {
                        font-size: 28px;
                    }

                    .collection-card.featured {
                        min-height: 400px;
                    }

                    .collection-content {
                        padding: 30px;
                    }

                    .collection-content h3 {
                        font-size: 24px;
                    }

                    .collection-content h4 {
                        font-size: 20px;
                    }
                }

                @media (max-width: 576px) {
                    .collection-card {
                        min-height: 250px;
                    }

                    .collection-content {
                        padding: 20px;
                    }
                }
            `}</style>
        </section>
    );
};

export default UomoStudioCollection;
