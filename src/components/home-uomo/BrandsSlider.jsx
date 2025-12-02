import React from 'react';

const BrandsSlider = () => {
    const brands = [
        { id: 1, name: 'Nike', logo: '/assets/img/brands/brand1.png' },
        { id: 2, name: 'Adidas', logo: '/assets/img/brands/brand2.png' },
        { id: 3, name: 'Puma', logo: '/assets/img/brands/brand3.png' },
        { id: 4, name: 'Reebok', logo: '/assets/img/brands/brand4.png' },
        { id: 5, name: 'Under Armour', logo: '/assets/img/brands/brand5.png' },
        { id: 6, name: 'New Balance', logo: '/assets/img/brands/brand6.png' },
        { id: 7, name: 'Asics', logo: '/assets/img/brands/brand7.png' }
    ];

    return (
        <section className="brands-slider-section py-5">
            <div className="container">
                <div className="brands-wrapper">
                    <div className="brands-scroll">
                        {[...brands, ...brands].map((brand, index) => (
                            <div key={`${brand.id}-${index}`} className="brand-item">
                                <img 
                                    src={brand.logo} 
                                    alt={brand.name}
                                    className="brand-logo"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .brands-slider-section {
                    background: #fff;
                    overflow: hidden;
                }

                .brands-wrapper {
                    overflow: hidden;
                    padding: 40px 0;
                }

                .brands-scroll {
                    display: flex;
                    gap: 80px;
                    animation: scroll 30s linear infinite;
                }

                .brand-item {
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 150px;
                }

                .brand-logo {
                    max-width: 120px;
                    height: auto;
                    opacity: 0.6;
                    filter: grayscale(100%);
                    transition: all 0.3s ease;
                }

                .brand-item:hover .brand-logo {
                    opacity: 1;
                    filter: grayscale(0%);
                }

                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @media (max-width: 768px) {
                    .brands-scroll {
                        gap: 40px;
                    }

                    .brand-item {
                        min-width: 100px;
                    }

                    .brand-logo {
                        max-width: 80px;
                    }
                }
            `}</style>
        </section>
    );
};

export default BrandsSlider;
