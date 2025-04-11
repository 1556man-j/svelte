<script>
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



    if (globalThis.Swiper) {
      new Swiper("#cart-pro-template", {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        spaceBetween: 20,
        slidesPerView: 1,
        breakpoints: {
          360: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      })
 }});
</script>

<!-- main section start-->
<main>
	<!-- breadcrumb start -->
	<section class="breadcrumb-area">
		<div class="container">
			<div class="col">
				<div class="row">
					<div class="breadcrumb-index">
						<!-- breadcrumb main-title start-->
						<div class="breadcrumb-title">
							<h2>Your Shopping Cart</h2>
						</div>
						<!-- breadcrumb main-title end-->
						<!-- breadcrumb-list start -->
						<ul class="breadcrumb-list">
							<li class="breadcrumb-item-link">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item-link">
								<span>Your Shopping Cart</span>
							</li>
						</ul>
						<!-- breadcrumb-list end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- breadcrumb end -->
	<section class="cart-page section-ptb">
		<form method="post">
			<div class="container">
				<div class="row">
					<div class="col">
						<div class="cart-page-wrap">
							<div class="cart-wrap-info">
								<div class="cart-wrap-info">
									<div class="cart-item-wrap">
										<div class="cart-title">
											<h6>My cart:</h6>
											<span class="cart-count">
												<span class="cart-counter" id="cart-counters">0</span>
												<span class="cart-item-title">&nbsp;Items</span>
											</span>
										</div>
										<div class="item-wrap">
											<ul class="cart-wrap-ul cart-item"></ul>
										</div>
										<div class="cart-buttons">
											<a href="/collection" class="btn-style2">Continue shopping</a>
											<button id="clear-cart" class="btn-style2 clear">Clear Cart</button>
										</div>
									</div>
									<div class="special-notes">
										<label>Special instructions for seller</label>
										<textarea rows="10" name="note"></textarea>
									</div>
								</div>
								<div id="cart-items-container">
									<!-- Cart items will be dynamically injected here -->
								</div>
								<div class="cart-summary">
									<p>Subtotal: <span class="subtotal-price">€0.00</span></p>
									<div class="cart-buttons">
										<a href="/collection" class="btn-style2">Continue Shopping</a>
										<button id="clear-cart" class="btn-style2 clear">Clear Cart</button>
									</div>
								</div>
							</div>
							<div class="cart-info-wrap">
								<div class="cart-calculator cart-info">
									<h6>Shipping info</h6>
									<div class="culculate-shipping" id="shipping-calculator">
										<ul>
											<li class="field">
												<label>Country</label>
												<select>
													<option>Nigeria</option>
													<option>London</option>
													<option>Austria</option>
													<option>Belgium</option>
													<option>Bhutan</option>
													<option>Canada</option>
													<option>France</option>
													<option>Germany</option>
													<option>Maldives</option>
													<option>Nepal</option>
												</select>
											</li>
											<li class="field">
												<label>State</label>
												<select>
													<option>Gujarat</option>
													<option>Andaman and Nicobar Islands</option>
													<option>Andhra Pradesh</option>
													<option>Bihar</option>
													<option>Chandigarh</option>
													<option>Delhi</option>
													<option>Haryana</option>
													<option>Jammu and Kashmir</option>
													<option>Karnataka</option>
													<option>Ladakh</option>
												</select>
											</li>
											<li class="field cpn-code">
												<label>Postal/Zip Codes</label>
												<input type="text" name="q" placeholder="Zip/Postal Code" />
											</li>
										</ul>
										<div class="shipping-info">
											<a href="javascript:void(0)" class="get-rates">Calculate</a>
										</div>
									</div>
								</div>
								<div class="cart-total-wrap cart-info">
									<div class="cart-total">
										<div class="total-amount">
											<h6 class="total-title">Total</h6>
											<span class="amount total-price">€56.00</span>
										</div>
										<div class="proceed-to-discount">
											<input type="text" name="discount" placeholder="Discount code" />
										</div>
										<div class="proceed-to-checkout">
											<a href="/checkout-style1">Checkout</a>
										</div>
										<div class="cart-payment-icon">
											<a href="javascript:void(0)" class="payment-icon">
												<img src="/assets/img/payment/visa.svg" class="img-fluid" alt="visa" />
												<img src="/assets/img/payment/master.svg" class="img-fluid" alt="master" />
												<img
													src="/assets/img/payment/express.svg"
													class="img-fluid"
													alt="express"
												/>
												<img src="/assets/img/payment/paypal.svg" class="img-fluid" alt="paypal" />
												<img src="/assets/img/payment/diners.svg" class="img-fluid" alt="diners" />
												<img
													src="/assets/img/payment/discover.svg"
													class="img-fluid"
													alt="discover"
												/>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</section>
	<section class="cart-category collection-category">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="collection-category">
						<!-- cart-title start -->
						<div class="section-capture">
							<div class="section-title">
								<div class="section-cont-title">
									<h2><span>Featured collection</span></h2>
								</div>
							</div>
						</div>
						<!-- cart-title end -->
						<!-- cart-wrap slider start -->
						<div class="collection-wrap">
							<div class="collection-slider swiper" id="cart-pro-template">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/1" class="pro-img">
													<img
														src="/assets/img/product/p-25.jpg"
														class="img-fluid img1"
														alt="p-25"
													/>
													<img
														src="/assets/img/product/p-26.jpg"
														class="img-fluid img2"
														alt="p-26"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/1">Candy nut chocolate</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€11.00</span>
													<span class="old-price">€19.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="1"
														data-name="Candy nut chocolate"
														data-price="11.00"
														data-image="/assets/img/product/p-26.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>
									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/2" class="pro-img">
													<img
														src="/assets/img/product/p-27.jpg"
														class="img-fluid img1"
														alt="p-27"
													/>
													<img
														src="/assets/img/product/p-28.jpg"
														class="img-fluid img2"
														alt="p-28"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Quickview</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/2">A bakery doughnuts</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€21.00</span>
													<span class="old-price">€25.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="2"
														data-name="A bakery doughnuts"
														data-price="21.00"
														data-image="/assets/img/product/p-27.jpg"
													>
														<span class="tooltip-text">Quickview</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>
									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/3" class="pro-img">
													<img
														src="/assets/img/product/p-29.jpg"
														class="img-fluid img1"
														alt="p-29"
													/>
													<img
														src="/assets/img/product/p-30.jpg"
														class="img-fluid img2"
														alt="p-30"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/3">Fresh bread toast</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€24.00</span>
													<span class="old-price">€29.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="3"
														data-name="Fresh bread toast"
														data-price="24.00"
														data-image="/assets/img/product/p-29.jpg"
													>
														<span class="tooltip-text">Quickview</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>

									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/5" class="pro-img">
													<img
														src="/assets/img/product/p-33.jpg"
														class="img-fluid img1"
														alt="p-33"
													/>
													<img
														src="/assets/img/product/p-34.jpg"
														class="img-fluid img2"
														alt="p-34"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/5">Jamun fruit pastry</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€25.00</span>
													<span class="old-price">€35.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quick view"
														data-id="5"
														data-name="Jamun fruit pastry"
														data-price="25.00"
														data-image="/assets/img/product/p-34.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>

									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/7" class="pro-img">
													<img
														src="/assets/img/product/p-37.jpg"
														class="img-fluid img1"
														alt="p-37"
													/>
													<img
														src="/assets/img/product/p-38.jpg"
														class="img-fluid img2"
														alt="p-38"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/7">Sandwich olka bread</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€31.00</span>
													<span class="old-price">€39.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="7"
														data-name="Sandwich olka bread"
														data-price="31.00"
														data-image="/assets/img/product/p-37.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>

									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/9" class="pro-img">
													<img
														src="/assets/img/product/p-41.jpg"
														class="img-fluid img1"
														alt="p-41"
													/>
													<img
														src="/assets/img/product/p-42.jpg"
														class="img-fluid img2"
														alt="p-42"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/9">Creamy for rasmalai</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€54.00</span>
													<span class="old-price">€65.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="9"
														data-name="Creamy for rasmalai"
														data-price="54.00"
														data-image="/assets/img/product/p-41.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>

									<div class="swiper-slide">
										<!-- product start -->
										<div class="single-product-wrap">
											<!-- product-img start -->
											<div class="product-image">
												<a href="/product-template/11" class="pro-img">
													<img
														src="/assets/img/product/p-45.jpg"
														class="img-fluid img1"
														alt="p-45"
													/>
													<img
														src="/assets/img/product/p-46.jpg"
														class="img-fluid img2"
														alt="p-46"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-img end -->
											<!-- product-content start -->
											<div class="product-content">
												<div class="type-vendor">
													<a href="/collection" class="product-type">Bakery</a>
													<span>/</span>
													<a href="/collection" class="product-vendor">Banno</a>
												</div>
												<!-- product-title start -->
												<h6>
													<a href="/product-template/11">Red sugar biscuit</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€61.00</span>
												</div>
												<!-- product-price end -->
												<!-- product-rating start-->
												<div class="product-rating">
													<span class="star-rating">
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
														<i class="far fa-star"></i>
													</span>
												</div>
												<!-- product-rating end -->
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="wishlist-product"
														class="wishlist-product"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="11"
														data-name="Red sugar biscuit"
														data-price="61.00"
														data-image="/assets/img/product/p-45.jpg"
													>
														<span class="tooltip-text">Quick view</span>
														<span class="quickview-icon"><i class="feather-eye"></i></span>
													</a>
												</div>
												<!-- product-action end -->
											</div>
											<!-- product-content end -->
										</div>
										<!-- product end -->
									</div>
								</div>
							</div>
						</div>
						<!-- cart-wrap slider end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- instra start -->
	<section class="instagram-warp bt section-ptb">
		<div class="container-fluid">
			<div class="row">
				<div lang="col">
					<div class="section-capture">
						<div class="section-title">
							<span class="sub-title">@Our instagram</span>
							<h2>Follow on instagram</h2>
						</div>
					</div>
					<div class="insta-slider owl-carousel owl-theme" id="insta-slider">
						<div class="item">
							<a href="javascript:void(0)" class="banner-hover">
								<img
									src="/assets/img/insta/backery-instagram-01.jpg"
									class="img-fluid"
									alt="backery-instagram-01"
								/>
							</a>
						</div>
						<div class="item">
							<a href="javascript:void(0)" class="banner-hover">
								<img
									src="/assets/img/insta/backery-instagram-02.jpg"
									class="img-fluid"
									alt="backery-instagram-02"
								/>
							</a>
						</div>
						<div class="item">
							<a href="javascript:void(0)" class="banner-hover">
								<img
									src="/assets/img/insta/backery-instagram-03.jpg"
									class="img-fluid"
									alt="backery-instagram-03"
								/>
							</a>
						</div>
						<div class="item">
							<a href="javascript:void(0)" class="banner-hover">
								<img
									src="/assets/img/insta/backery-instagram-04.jpg"
									class="img-fluid"
									alt="backery-instagram-04"
								/>
							</a>
						</div>
						<div class="item">
							<a href="javascript:void(0)" class="banner-hover">
								<img
									src="/assets/img/insta/backery-instagram-05.jpg"
									class="img-fluid"
									alt="backery-instagram-05"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- instra end -->
</main>
<!-- main section end-->
