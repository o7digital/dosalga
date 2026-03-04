import React from "react";
import Link from "next/link";
import GiftSection from "../components/common/GiftSection";
import { articleCardData } from "../data/articleCard";

const BlogGridPage = () => {
  return (
    <>
      <div className="blog-grid-section mt-110 mb-110">
        <div className="container-md container-fluid">
          <div className="row g-4 mb-80 justify-content-center">
            {articleCardData.map((e) => (
              <div key={e.id} className="col-lg-4 col-sm-6">
                <div className="article-card">
                  <div className="article-image">
                    <Link legacyBehavior href="/blog-details">
                      <a className="article-card-img hover-img">
                        <img src={e.grid_img} alt="" />
                      </a>
                    </Link>
                    <div className="blog-date">
                      <Link legacyBehavior href="/blog-grid">
                        <a>{e.date}</a>
                      </Link>
                    </div>
                  </div>
                  <div className="article-card-content">
                    <div className="tag">
                      <ul>
                        {e.category.map((tag) => (
                          <li key={tag.id}>
                            <Link legacyBehavior href="/blog-grid">
                              {tag.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <h5>
                      <Link legacyBehavior href="/blog-details">
                        <a className="hover-underline">{e.grid_title}</a>
                      </Link>
                    </h5>
                    <p>{e.gird_driscription}</p>
                    <Link legacyBehavior href="/blog-details">
                      <a>Read More</a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav className="shop-pagination">
            <ul className="pagination-list">
              <li>
                <a href="#" className="shop-pagi-btn">
                  <i className="bi bi-chevron-left" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#" className="active">
                  2
                </a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-three-dots" />
                </a>
              </li>
              <li>
                <a href="#">6</a>
              </li>
              <li>
                <a href="#" className="shop-pagi-btn">
                  <i className="bi bi-chevron-right" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <GiftSection />
    </>
  );
};

export default BlogGridPage;
