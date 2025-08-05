import React from 'react'
import { articleCardData } from '../data/articleCard'
import Link from 'next/link'
import GiftSection from '../components/common/GiftSection'

const BlogStandardRightSidebarPage = () => {
  return (
    <>
      <div className="blog-standard-right-sidebar-section mt-110 mb-110">
        <div className="container-md container-fluid">
            <div className="row g-lg-4 gy-5">
            <div className="col-lg-8">
                <div className="row g-4 mb-80">
                {articleCardData.slice(0, 4).map((e) => (
                      <div key={e.id} className="col-md-12">
                        <div className="article-card style-3">
                          <div className="article-image">
                            <Link legacyBehavior href="/blog-details">
                              <a className="article-card-img">
                                <img src={e.standard_img} alt="" />
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
                                      <a>{tag.name}</a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <h5>
                              <Link legacyBehavior href="/blog-details">
                                <a className="hover-underline">
                                  {e.standard_title}
                                </a>
                              </Link>
                            </h5>
                            <p>{e.standard_description}</p>
                            <Link legacyBehavior href="/blog-details">
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                
                
                </div>
                <nav className="shop-pagination">
                <ul className="pagination-list">
                    <li>
                    <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-left" /></a>
                    </li>
                    <li>
                    <a href="#">1</a>
                    </li>
                    <li>
                    <a href="#" className="active">2</a>
                    </li>
                    <li>
                    <a href="#">3</a>
                    </li>
                    <li>
                    <a href="#"><i className="bi bi-three-dots" /></a>
                    </li>
                    <li>
                    <a href="#">6</a>
                    </li>
                    <li>
                    <a href="#" className="shop-pagi-btn"><i className="bi bi-chevron-right" /></a>
                    </li>
                </ul>
                </nav>
            </div>
            <div className="col-lg-4">
                <div className="sidebar-area">
                <div className="shop-widget mb-30">
                    <h5 className="shop-widget-title">Search Here</h5>
                    <form>
                    <div className="search-box">
                        <input type="text" placeholder="Search Here" />
                        <button type="submit"><i className="bx bx-search" /></button>
                    </div>
                    </form>
                </div>
                <div className="shop-widget mb-30">
                    <div className="check-box-item">
                    <h5 className="shop-widget-title">Categories</h5>
                    <ul className="shop-item">
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>All Product</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Healthy &amp; Natural</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Beauty &amp; Cosmetics</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Selfcare Veggies</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Personal Care</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Men’s Collections</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>kids &amp; Baby Set</a></Link>
                        </li>
                        <li>
                        <Link legacyBehavior href="/blog-grid"><a>Summer product</a></Link>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="shop-widget mb-30">
                    <h5 className="shop-widget-title">Recent Post</h5>
                    <div className="recent-post-widget mb-20">
                    <div className="recent-post-img">
                        <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img1.png" alt="" /></a></Link>
                    </div>
                    <div className="recent-post-content">
                        <Link legacyBehavior href="/blog-grid"><a>20 July, 2023</a></Link>
                        <h6><Link legacyBehavior href="/blog-details"><a>Poutsicle Hydrating Lipo Stain offering.</a></Link></h6>
                    </div>
                    </div>
                    <div className="recent-post-widget mb-20">
                    <div className="recent-post-img">
                        <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img2.png" alt="" /></a></Link>
                    </div>
                    <div className="recent-post-content">
                        <Link legacyBehavior href="/blog-grid"><a>12 July, 2023</a></Link>
                        <h6><Link legacyBehavior href="/blog-details"><a>rutrum vitae augue idel euismod pulvi.</a></Link></h6>
                    </div>
                    </div>
                    <div className="recent-post-widget mb-20">
                    <div className="recent-post-img">
                        <Link legacyBehavior href="/blog-details"><a><img src="/assets/img/inner-page/recent-post-img3.png" alt="" /></a></Link>
                    </div>
                    <div className="recent-post-content">
                        <Link legacyBehavior href="/blog-grid"><a>04 July, 2023</a></Link>
                        <h6><Link legacyBehavior href="/blog-details"><a>Donec blandit fermentu diam non.</a></Link></h6>
                    </div>
                    </div>
                </div>
                <div className="shop-widget">
                    <h5 className="shop-widget-title">Tags</h5>
                    <ul className="tag-list">
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Makeup</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Organic</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Skin Care</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Beauty Care</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Herbal</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Handmade</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Zerowaste</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Women Fashion</a></Link>
                    </li>
                    <li>
                        <Link legacyBehavior href="/blog-grid"><a> Natural</a></Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
      <GiftSection/>
    </>
  )
}

export default BlogStandardRightSidebarPage
