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

    const mobileMenu = document.getElementById('menu-toggle');
    const body = document.body;
    const closeBtn = mobileMenu?.querySelector('.close-menu');
    const links = mobileMenu?.querySelectorAll('a');

    const closeMobileMenu = () => {
      // Hide the menu
      mobileMenu?.classList.remove('active', 'block');
      mobileMenu?.classList.add('hidden');

      // Remove dark overlay if you have one (e.g., .menu-overlay or .modal-backdrop)
      const overlay = document.querySelector('.menu-overlay, .modal-backdrop');
      overlay?.classList.add('hidden');

      // Restore body scroll
      body.classList.remove('overflow-hidden', 'fixed');
    };

    // Close when clicking a link
    links?.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close with close button
    closeBtn?.addEventListener('click', closeMobileMenu);
  })
</script>

 <!-- mobile-menu start -->
 <div class="mobile-menu  hidden z-50" id="menu-toggle">
    <div class="main-menu-area">
      <!-- box-header start -->
      <div class="box-header">
        <button class="close-menu" type="button">
          <i class="feather-x"></i>
        </button>
      </div>
      <!-- box-header end -->
      <div class="megamenu-content">
        <div class="mainwrap collapse show" id="resp-main">
          <ul class="main-menu">
            <li class="menu-link">
              <a href="/" class="link-title">
                <span class="sp-link-title">Home</span>
                <span class="menu-arrow"
                  ><i class="feather-chevron-down"></i
                ></span>
              </a>
              <a href="/" class="link-title link-title-lg">
                <span class="sp-link-title">Home</span>
              </a>
            </li>
            <li class="menu-link">
              <a href="/collection" class="link-title">
                <span class="sp-link-title">Product</span>
                <span class="menu-arrow"
                  ><i class="feather-chevron-down"></i
                ></span>
              </a>
              <a
                href="#resp-single-product"
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
                id="resp-single-product"
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
                                  <span class="new-price">$21,00</span>
                                  <span class="old-price">$25,00</span>
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
                                  <span class="new-price">$25,00</span>
                                  <span class="old-price">$35,00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="menu-product-btn">
                        <a href="/collection" class="menu-pro-link">
                          <span class="menu-title">See more</span>
                          <span class="menu-icon"
                            ><i class="bi bi-chevron-right"></i
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
                                  <span class="new-price">$11,00</span>
                                  <span class="old-price">$19,00</span>
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
                                  <span class="new-price">$45.00</span>
                                  <span class="old-price">$54.00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <div class="menu-product-btn">
                        <a href="/collection" class="menu-pro-link">
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
              <a
                href="/article"
                class="link-title link-title-lg"
              >
                <span class="sp-link-title">Blog</span>
              </a>
            </li>
            <li class="menu-link">
              <a href="/about" class="link-title link-title-lg">
                <span class="sp-link-title">About us</span>
              </a>
            </li>
            <li class="menu-link">
              <a href="/contact" class="link-title link-title-lg">
                <span class="sp-link-title">Contact us</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- mega-menu end -->
    </div>
  </div>
  <!-- mobile-menu end -->
