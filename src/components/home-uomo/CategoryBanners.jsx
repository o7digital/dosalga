import React from 'react';
import Link from 'next/link';

const CategoryBanners = () => {
    const categories = [
        {
            id: 1,
            title: 'Shop Women',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop?category=women'
        },
        {
            id: 2,
            title: 'Shop Men',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop?category=men'
        },
        {
            id: 3,
            title: 'Shop Kids',
            image: '/assets/img/home1/banner-img.png',
            link: '/shop?category=kids'
        }
    ];

    return (
        <section className="category-banners-section py-5">
            <div className="container">
                <div className="row g-4">
                    {categories.map((category) => (
                        <div key={category.id} className="col-lg-4 col-md-6">
                            <div className="category-banner">
                                <div className="banner-image">
                                    <img 
                                        src={category.image} 
                                        alt={category.title}
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="banner-content">
                                    <h3>{category.title}</h3>
                                    <Link legacyBehavior href={category.link}>
                                        <a className="banner-link">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .category-banners-section {
                    background: #f8f9fa;
                }

                .category-banner {
                    position: relative;
                    overflow: hidden;
                    border-radius: 12px;
                    height: 400px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .category-banner:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
                }

                .banner-image {
                    width: 100%;
                    height: 100%;
                }

                .banner-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }

                .category-banner:hover .banner-image img {
                    transform: scale(1.1);
                }

                .banner-content {
                    position: absolute;
                    bottom: 40px;
                    left: 40px;
                    z-index: 2;
                }

                .banner-content h3 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #fff;
                    margin: 0 0 16px 0;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.3);
                }

                .banner-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    background: #fff;
                    color: #000;
                    border-radius: 50%;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .banner-link:hover {
                    background: #000;
                    color: #fff;
                    transform: scale(1.1);
                }

                @media (max-width: 991px) {
                    .category-banner {
                        height: 350px;
                    }

                    .banner-content {
                        bottom: 30px;
                        left: 30px;
                    }

                    .banner-content h3 {
                        font-size: 24px;
                    }
                }

                @media (max-width: 576px) {
                    .category-banner {
                        height: 300px;
                    }

                    .banner-content {
                        bottom: 20px;
                        left: 20px;
                    }

                    .banner-content h3 {
                        font-size: 20px;
                    }
                }
            `}</style>
        </section>
    );
};

export default CategoryBanners;
