<script>
  import {goto } from '$app/navigation';
    import { onMount } from "svelte";

  onMount(() => {
// Wait until DOM is ready before running the JS
    const checkDOM = setInterval(() => {
      const exists = document.querySelector(".product-title h2");
      if (exists && window.loadProductData) {
        clearInterval(checkDOM);
        window.loadProductData(); // Run the function from your external JS
      }
    }, 100);
  })
</script>

<!-- top-notification start -->
<section class="top-notification-bar">
  <div class="container-fluid">
    <div class="row">
      <div class="col">
        <ul class="grid-wrap">
          <li class="grid-wrapper contact-wrap">
            <div class="contact-link">
              <div class="connect-wrap contact-mail">
                <a href="mailto:demo@support.com"
                  ><i class="feather-mail"></i>
                  <span>demo@support.com</span>
                </a>
              </div>
            </div>
          </li>
          <li class="grid-wrapper center-wrap">
            <div class="offer-text">
              <span class="icon"><i class="feather-truck"></i></span>
              <p>Free shipping above $50</p>
            </div>
          </li>
          <li class="grid-wrapper other-wrap">
            <div class="other-link">
              <!-- user start -->
              <div class="noti-wrap user-wrap">
                <div class="acc-desk-header">
                  <div class="acc-title">
                    <a on:click={() => goto('/login')} aria-label="Go to Login page" href="/login" class="acc-ti">
                      <span class="user-icon"
                        ><i class="feather-user"></i
                      ></span>
                      <span class="user-title">Account</span>
                    </a>
                  </div>
                  <div class="acc-title-lg">
                    <a on:click={() => goto('/login')} aria-label="Go to Login page" href="/login"
                      ><i class="feather-user"></i
                    ></a>
                  </div>
                </div>
              </div>
              <!-- user end -->
              <!-- wishlist start -->
              <div class="noti-wrap wishlist-wrap">
                <a on:click={() => goto('/wishlist')} aria-label="Go to Wishlist Page" href="/wishlist" class="header-wishlist-btn">
                  <span class="wishlist-icon"
                    ><i class="feather-heart"></i
                  ></span>
                  <span class="wishlist-title">Wishlist</span>
                  <span class="wishlist-counter">0</span>
                </a>
              </div>
              <!-- wishlist end -->
              <!-- cart start -->
              <div class="noti-wrap cart-wrap">
                <div class="shopping-widget">
                  <div class="shopping-cart">
                    <a href="javascript:void(0)" class="cart-count">
                      <span class="cart-icon-wrap">
                        <span class="cart-icon"
                          ><i class="feather-shopping-bag"></i
                        ></span>
                        <span class="cart-title">My cart</span>
                        <span class="bigcounter" id="mobile-cart-counter">0</span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- cart end -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>
<!-- top-notification end -->
<!-- header start -->
<!-- header start -->
<header class="header-area">
  <div class="header-main-area">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="header-main">
            <!-- header logo start -->
            <div class="header-element logo py-md-3">
              <a on:click={() => goto('/')} role='button' href='/' class="theme-header-logo">
                <img src="/assets/img/logo/logo.svg" width="100"class="img-fluid" alt="logo" />
              </a>
            </div>
            <!-- header logo end -->
            <!-- header mega menu start -->
            <div class="header-element megamenu-content">
              <div class="mainwrap collapse show" id="main-collapse">
                <ul class="main-menu">
                  <li class="menu-link">
                    <a on:click={() => goto('/')} role='button' href='/' class="link-title">
                      <span class="sp-link-title">Home</span>
                    </a>
                    <a
                      href="#desk-home"
                      data-bs-toggle="collapse"
                      class="link-title link-title-lg"
                    >
                      <span class="sp-link-title">Home</span>
                    </a>
                  </li>
                  <li class="menu-link">
                    <a href="/collection" on:click={() => goto('/collection')} role='button' class="link-title">
                      <span class="sp-link-title"
                        >Product
                        <span class="label">sale</span>
                      </span>
                      <span class="menu-arrow"
                        ><i class="feather-chevron-down"></i
                      ></span>
                    </a>
                    <a
                      href="#desk-single-product"
                      data-bs-toggle="collapse"
                      class="link-title link-title-lg"
                    >
                      <span class="sp-link-title">Product</span>
                      <span class="menu-arrow"
                        ><i class="feather-chevron-down"></i
                      ></span>
                    </a>
                    <div
                      class="menu-dropdown product-menu collapse"
                      id="desk-single-product"
                    >
                      <ul class="container ul p-0">
                        <li class="productlink-li">
                          <div class="menu-product">
                            <ul class="product-ul">
                              <li class="product-li">
                                <div class="product-menu-list">
                                  <div class="single-product-wrap">
                                    <div class="product-image">
                                      <a
                                        href="/product-template/2"
                                        class="pro-img"
                                      >
                                        <img
                                          src="/assets/img/product/p-3.jpg"
                                          class="img-fluid img1"
                                          alt="p-3"
                                        />
                                        <img
                                          src="/assets/img/product/p-4.jpg"
                                          class="img-fluid img2"
                                          alt="p-4"
                                        />
                                      </a>
                                    </div>
                                    <div class="product-content">
                                      <h6>
                                        <a href="/product-template/2"
                                          >A bakery doughnuts</a
                                        >
                                      </h6>
                                      <div class="price-box">
                                        <span class="new-price"
                                          >$21,00</span
                                        >
                                        <span class="old-price"
                                          >$25,00</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="product-li">
                                <div class="product-menu-list">
                                  <div class="single-product-wrap">
                                    <div class="product-image">
                                      <a
                                        href="/product-template/1"
                                        class="pro-img"
                                      >
                                        <img
                                          src="/assets/img/product/p-1.jpg"
                                          class="img-fluid img1"
                                          alt="p-1"
                                        />
                                        <img
                                          src="/assets/img/product/p-2.jpg"
                                          class="img-fluid img2"
                                          alt="p-2"
                                        />
                                      </a>
                                    </div>
                                    <div class="product-content">
                                      <h6>
                                        <a href="/product-template/1"
                                          >Candy nut chocolate</a
                                        >
                                      </h6>
                                      <div class="price-box">
                                        <span class="new-price"
                                          >$11,00</span
                                        >
                                        <span class="old-price"
                                          >$19,00</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div class="menu-product-btn">
                              <a
                                href="/collection"
                                class="menu-pro-link"
                              >
                                <span class="menu-title">See more</span>
                                <span class="menu-icon"
                                  ><i class="feather-chevron-right"></i
                                ></span>
                              </a>
                            </div>
                          </div>
                        </li>
                        <li class="productlink-li">
                          <div class="menu-product">
                            <ul class="product-ul">
                              <li class="product-li">
                                <div class="product-menu-list">
                                  <div class="single-product-wrap">
                                    <div class="product-image">
                                      <a
                                        href="/product-template/6"
                                        class="pro-img"
                                      >
                                        <img
                                          src="/assets/img/product/p-9.jpg"
                                          class="img-fluid img1"
                                          alt="p-9"
                                        />
                                        <img
                                          src="/assets/img/product/p-10.jpg"
                                          class="img-fluid img2"
                                          alt="p-10"
                                        />
                                      </a>
                                    </div>
                                    <div class="product-content">
                                      <h6>
                                        <a href="/product-template/6"
                                          >The bread a fresh</a
                                        >
                                      </h6>
                                      <div class="price-box">
                                        <span class="new-price"
                                          >$25,00</span
                                        >
                                        <span class="old-price"
                                          >$35,00</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                              <li class="product-li">
                                <div class="product-menu-list">
                                  <div class="single-product-wrap">
                                    <div class="product-image">
                                      <a
                                        href="/product-template/7"
                                        class="pro-img"
                                      >
                                        <img
                                          src="/assets/img/product/p-7.jpg"
                                          class="img-fluid img1"
                                          alt="p-7"
                                        />
                                        <img
                                          src="/assets/img/product/p-8.jpg"
                                          class="img-fluid img2"
                                          alt="p-8"
                                        />
                                      </a>
                                    </div>
                                    <div class="product-content">
                                      <h6>
                                        <a href="/product-template/7"
                                          >Sandwich olka bread</a
                                        >
                                      </h6>
                                      <div class="price-box">
                                        <span class="new-price"
                                          >$31,00</span
                                        >
                                        <span class="old-price"
                                          >$39,00</span
                                        >
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            </ul>
                            <div class="menu-product-btn">
                              <a
                                href="/collection"
                                class="menu-pro-link"
                              >
                                <span class="menu-title">See more</span>
                                <span class="menu-icon"
                                  ><i class="feather-chevron-right"></i
                                ></span>
                              </a>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li class="menu-link">
                    <a href="/article" on:click={() => goto('/article')} role='button' class="link-title">
                      <span class="sp-link-title">Blog</span>
                    </a>

                    <div
                      class="menu-dropdown single-menu collapse"
                      id="desk-blog"
                    ></div>
                  </li>
                  <li class="menu-link">
                    <a href="/about" on:click={() => goto('/about')} role='button' class="link-title">
                      <span class="sp-link-title">About us</span>
                    </a>
                  </li>
                  <li class="menu-link">
                    <a href="/contact" on:click={() => goto('/contact')} role='button' class="link-title">
                      <span class="sp-link-title">Contact us</span>
                    </a>

                    <div
                      class="menu-dropdown single-menu collapse"
                      id="desk-blog"
                    ></div>
                  </li>
                </ul>
              </div>
            </div>
            <!-- header megamenu end -->
            <!-- right-block-box start-->
            <div class="header-element right-block-box">
              <ul class="shop-element">
                <li class="side-wrap toggle-wrap">
                  <!-- button toggler start -->
                  <button class="toggler-button">
                    <i class="feather-menu"></i>
                  </button>
                  <!-- button toggler end -->
                </li>
                <li class="side-wrap search-bar-wrap">
                  <div class="search-rap">
                    <a
                      class="search-crap"
                      data-bs-toggle="collapse"
                      href="#search-crap"
                    >
                      <i class="feather-search"></i>
                    </a>
                    <div class="crap-search collapse" id="search-crap">
                      <div class="form-search">
                        <input
                          type="search"
                          name="q"
                          placeholder="Search product here..."
                          id="search"
                          class="input-text"
                        />
                        <a href="javascript:void(0)" class="search-btn"
                          ><i class="feather-search"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="side-wrap search-wrap">
                  <a
                    href="#seachmodal"
                    class="search-popup"
                    data-bs-toggle="modal"
                  >
                    <i class="feather-search"></i>
                  </a>
                  <a
                    href="#seachmodal"
                    class="search-popup search-popup-lg"
                    data-bs-toggle="modal"
                    ><i class="feather-search"></i
                  ></a>
                </li>
                <li class="side-wrap user-wrap">
                  <div class="acc-desk-header">
                    <div class="acc-title">
                      <span class="user-icon"
                        ><i class="feather-user"></i
                      ></span>
                      <a href="/login" on:click={() => goto('/login')} role='button' class="acc-ti"
                        >Account</a
                      >
                    </div>
                    <div class="acc-title-lg">
                      <a href="/login" on:click={() => goto('/login')} role='button' aria-label="Go to Login page"
                        ><i class="feather-user"></i
                      ></a>
                    </div>
                  </div>
                </li>
                <li class="side-wrap wishlist-wrap">
                  <a
                    href="/wishlist" on:click={() => goto('/wishlist')} role='button'
                    class="header-wishlist-btn"
                  >
                    <span class="wishlist-icon"
                      ><i class="feather-heart"></i
                    ></span>
                    <span class="wishlist-title">Wishlist</span>
                    <span class="wishlist-counter">5</span>
                  </a>
                </li>
                <li class="side-wrap cart-wrap">
                  <div class="shopping-widget">
                    <div class="shopping-cart">
                      <a href="javascript:void(0)" class="cart-count">
                        <span class="cart-icon-wrap">
                          <span class="cart-icon"
                            ><i class="feather-shopping-bag"></i
                          ></span>
                          <span class="cart-title">My cart</span>
                          <span class="bigcounter" id="mobile-cart-counter">0</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </li>
                <li class="side-wrap track-wrap">
                  <div class="track-block">
                    <a href="tel:+00123456789">
                      <span class="icon"
                        ><i class="feather-headphones"></i
                      ></span>
                      <span class="title-block">
                        <span class="hot-title">Hotline:</span
                        >+00-1234567890
                      </span>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <!-- right-block-box end-->
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
<!-- header end -->
<!-- header end -->

