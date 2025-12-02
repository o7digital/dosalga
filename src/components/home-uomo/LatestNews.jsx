import React from 'react';
import Link from 'next/link';

const posts = [
  {
    id: 1,
    title: 'Habitant morbi tristique senectus',
    date: 'April 05, 2023',
    author: 'Admin',
    image: '/assets/img/home2/latest-article-img1.png'
  },
  {
    id: 2,
    title: 'Woman with good shoes is never be ugly place',
    date: 'April 05, 2023',
    author: 'Admin',
    image: '/assets/img/home2/latest-article-img2.png'
  },
  {
    id: 3,
    title: 'What Freud Can Teach Us About Furniture',
    date: 'April 05, 2023',
    author: 'Admin',
    image: '/assets/img/home2/latest-article-img3.png'
  }
];

const LatestNews = () => {
  return (
    <section className="latest-news">
      <div className="container">
        <div className="header">
          <h2 className="section-title">Latest News</h2>
          <Link legacyBehavior href="/blog-grid">
            <a className="read-all">Read all articles</a>
          </Link>
        </div>

        <div className="news-grid">
          {posts.map((post) => (
            <article key={post.id} className="card">
              <div className="image">
                <img src={post.image} alt={post.title} />
              </div>
              <div className="meta">
                <span className="author">By {post.author}</span>
                <span className="date">{post.date}</span>
              </div>
              <h3 className="title">{post.title}</h3>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .latest-news {
          padding: 40px 0 90px;
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 26px;
        }

        .section-title {
          font-size: 32px;
          font-weight: 500;
          color: #2b2b2b;
          margin: 0;
        }

        .read-all {
          text-transform: uppercase;
          font-size: 13px;
          letter-spacing: 0.5px;
          color: #111;
          text-decoration: none;
          border-bottom: 2px solid #111;
          padding-bottom: 4px;
          transition: color 0.2s ease, border-color 0.2s ease;
        }

        .read-all:hover {
          color: #d72d2d;
          border-color: #d72d2d;
        }

        .news-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }

        .card {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .image {
          width: 100%;
          overflow: hidden;
          border-radius: 8px;
        }

        .image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }

        .card:hover .image img {
          transform: scale(1.02);
        }

        .meta {
          display: flex;
          gap: 14px;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.4px;
          color: #7a7a7a;
        }

        .title {
          font-size: 18px;
          font-weight: 400;
          color: #1f1f1f;
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 992px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .latest-news {
            padding: 20px 0 70px;
          }

          .header {
            flex-direction: column;
            align-items: flex-start;
          }

          .news-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default LatestNews;
