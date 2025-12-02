import React from 'react';
import Link from 'next/link';

const hotspots = [
  { id: 1, label: 'Lightweight fabric', top: '24%', left: '38%' },
  { id: 2, label: 'Breathable mesh', top: '46%', left: '50%' },
  { id: 3, label: 'Cushioned landing', top: '70%', left: '48%' }
];

const FeaturedProducts = () => {
  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="featured-grid">
          <div className="hero-image">
            <img src="/assets/images/home/demo10/lookbook-bg.jpg" alt="Featured athlete" />
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="hotspot"
                style={{ top: spot.top, left: spot.left }}
                aria-label={spot.label}
              >
                <span className="pulse" />
                <div className="tooltip">{spot.label}</div>
              </div>
            ))}
          </div>

          <div className="product-card">
            <p className="brand">HUMMEL</p>
            <h3 className="title">Cableknit Shawl</h3>
            <div className="price">
              <span className="old">$189</span>
              <span className="new">$129</span>
            </div>
            <div className="product-image">
              <img src="/assets/img/home1/product-img-3.png" alt="Cableknit Shawl" />
            </div>
            <div className="color-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <Link legacyBehavior href="/shop">
              <a className="cta">Shop Now</a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .featured-section {
          padding: 90px 0 60px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 500;
          margin-bottom: 32px;
          color: #2b2b2b;
        }

        .featured-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .hero-image {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
        }

        .hero-image img {
          width: 100%;
          height: auto;
          display: block;
        }

        .hotspot {
          position: absolute;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #fff;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.25);
          transform: translate(-50%, -50%);
          cursor: pointer;
        }

        .hotspot .pulse {
          position: absolute;
          inset: -10px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.6);
          animation: pulse 1.8s infinite;
        }

        .hotspot .tooltip {
          position: absolute;
          top: -12px;
          left: 24px;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(6px);
          transition: all 0.2s ease;
          pointer-events: none;
        }

        .hotspot:hover .tooltip {
          opacity: 1;
          transform: translateY(0);
        }

        .product-card {
          padding: 24px;
          border-radius: 12px;
          border: 1px solid #ececec;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.06);
          background: #fff;
          text-align: center;
        }

        .brand {
          letter-spacing: 1px;
          font-size: 12px;
          font-weight: 700;
          color: #777;
          margin-bottom: 10px;
        }

        .title {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 12px;
          color: #222;
        }

        .price {
          display: flex;
          justify-content: center;
          gap: 12px;
          align-items: baseline;
          margin-bottom: 16px;
        }

        .old {
          color: #b0b0b0;
          text-decoration: line-through;
          font-size: 16px;
        }

        .new {
          color: #d72d2d;
          font-weight: 600;
          font-size: 20px;
        }

        .product-image {
          padding: 10px;
          margin-bottom: 14px;
        }

        .product-image img {
          max-width: 240px;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .color-dots {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 18px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid #ccc;
          background: #efefef;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dot:hover {
          border-color: #111;
        }

        .dot.active {
          background: #111;
          border-color: #111;
        }

        .cta {
          display: inline-block;
          padding: 12px 24px;
          border: 1px solid #111;
          color: #111;
          border-radius: 24px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .cta:hover {
          background: #111;
          color: #fff;
        }

        @keyframes pulse {
          0% { transform: scale(0.7); opacity: 0.8; }
          70% { transform: scale(1.3); opacity: 0; }
          100% { transform: scale(0.7); opacity: 0; }
        }

        @media (max-width: 992px) {
          .featured-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .featured-section {
            padding: 70px 0 40px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 24px;
          }

          .product-card {
            margin: 0 auto;
            max-width: 360px;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
