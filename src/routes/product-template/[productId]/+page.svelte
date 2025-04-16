<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let quantityInput;

	function setupFullscreenButton() {
		const fullscreenBtn = document.getElementById('fullscreenBtn');
		const image = document.getElementById('mainProductImage');

		if (fullscreenBtn && image) {
			fullscreenBtn.addEventListener('click', () => {
				if (image.requestFullscreen) {
					image.requestFullscreen();
				} else if (image.webkitRequestFullscreen) {
					image.webkitRequestFullscreen(); // Safari
				} else if (image.msRequestFullscreen) {
					image.msRequestFullscreen(); // IE11
				}
			});
		}
	}

	function getProductId() {
		if (browser) {
			return window.location.pathname.split('/').pop();
		}
		return null;
	}

	function loadProductData() {
		fetch('/assets/json/product-data.json')
			.then((response) => response.json())
			.then((products) => {
				const productId = getProductId();
				const product = products.find((p) => p.id === productId);

				if (product) {
					window.currentProduct = product;
					const title = document.querySelector('.product-title h2');
					if (!title) return;

					document.querySelector('.breadcrumb-title h2').innerText = product.name;
					document.querySelector('.breadcrumb-item-link span').innerText = product.name;
					title.innerText = product.name;

					const priceElement = document.querySelector('.true-price');
					if (priceElement) {
						let rawPrice = product.price;
						if (typeof rawPrice !== 'string') rawPrice = String(rawPrice);
						const cleanedPrice = rawPrice.replace(/[^\d.-]/g, '');
						const numericPrice = parseFloat(cleanedPrice);

						if (!isNaN(numericPrice)) {
							priceElement.innerText = `$${numericPrice.toFixed(2)}`;
						} else {
							priceElement.innerText = '$0.00';
						}

						window.currentProduct = {
							...product,
							price: numericPrice
						};
					}

					document.querySelector('.product-imag').src = product.image;
					document.querySelector('.product-single.img-link').href = product.image;
				} else {
					console.error('Product not found');
				}
			})
			.catch((error) => console.error('Error fetching product data:', error));
	}

	function handleAddToCart(event) {
		event.preventDefault();

		if (!browser) return;

		const product = window.currentProduct;
		if (!product) return;

		const quantity = parseInt(quantityInput?.value) || 1;
		const productToAdd = { ...product, quantity };

		let cart = JSON.parse(localStorage.getItem('cart')) || [];
		const existingIndex = cart.findIndex((item) => item.id === productToAdd.id);

		if (existingIndex !== -1) {
			cart[existingIndex].quantity += quantity;
		} else {
			cart.push(productToAdd);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		window.dispatchEvent(new CustomEvent('cartUpdated'));
		document.querySelector('.mini-cart')?.classList.add('active');
	}

	onMount(() => {
		if (!browser) return;

		window.currentProduct = null;
		window.loadProductData = loadProductData;

		const checkDOM = setInterval(() => {
			const exists = document.querySelector('.product-title h2');
			if (exists && window.loadProductData) {
				clearInterval(checkDOM);
				window.loadProductData();
				setupFullscreenButton();
			}
		}, 100);

		// Setup swiper
		if (globalThis.Swiper) {
			new Swiper('#related-slider', {
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false
				},
				spaceBetween: 20,
				slidesPerView: 1,
				breakpoints: {
					360: { slidesPerView: 2 },
					992: { slidesPerView: 3 },
					1200: { slidesPerView: 4 }
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				}
			});
		}

		if (quantityInput) {
			quantityInput.value = 1;
		}
	});
</script>

<!-- main section start-->
<main>
	<!-- breadcrumb start-->
	<section class="breadcrumb-area">
		<div class="container">
			<div class="col">
				<div class="row">
					<div class="breadcrumb-index">
						<!-- breadcrumb main-title start-->
						<div class="breadcrumb-title">
							<h2></h2>
						</div>
						<!-- breadcrumb main-title end-->
						<!-- breadcrumb-list start -->
						<ul class="breadcrumb-list">
							<li class="breadcrumb-item-link">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item-link">
								<span></span>
							</li>
						</ul>
						<!-- breadcrumb-list end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- breadcrumb start-->
	<section class="product-details-page pro-style1">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="pro_details_pos pro_details_left_pos">
						<!-- Product slider start -->
						<div
							class="product_detail_slider product_details_tb product_details product_details_sticky"
						>
							<!-- Product slider start -->
							<div class="product_detail_img product_detail_img_bottom">
								<!-- top slick-slider start -->
								<div class="product_img_top">
									<button class="full-view" id="fullscreenBtn">
										<i class="bi bi-arrows-fullscreen"></i>
									</button>
									<div class="">
										<div class="">
											<a href="" class="product-single img-link">
												<img
													src=""
													class="img-fluid product-imag"
													alt="product"
													id="mainProductImage"
												/>
											</a>
										</div>
									</div>
								</div>
								<!-- top slick-slider end -->
							</div>
							<!-- Product slider end -->
						</div>
						<!-- product detail start -->
						<div class="product_details_wrap product_details_tb product_details">
							<div class="product_details_info">
								<div class="pro-nprist">
									<div class="product-info">
										<!-- product-rating start -->
										<div class="product-rating">
											<span class="star-rating">
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star-half-alt"></i>
											</span>
											<span class="spr-badge-caption">3 reviews</span>
										</div>
										<!-- product-rating end -->
									</div>
									<div class="product-info">
										<!-- product-title start -->
										<div class="product-title">
											<h2></h2>
										</div>
										<!-- product-title end -->
									</div>
									<div class="product-info">
										<div class="pro-prlb pro-sale">
											<div class="price-box">
												<span class="new-price true-price"></span>
												<span class="old-price">€95,00</span>
												<span class="percent-count">16</span>
											</div>
										</div>
									</div>
									<div class="product-info">
										<div class="product-inventory">
											<div class="stock-inventory stock-more">
												<p class="text-success">
													Hurry up! only
													<span class="available-stock bg-success">4</span>
													<span>products left in stock!</span>
												</p>
											</div>
											<div class="product-variant">
												<h6>Availability:</h6>
												<span class="stock-qty in-stock text-success">
													<span>In stock<i class="bi bi-check2"></i></span>
												</span>
												<span
													class="stock-qty out-stock text-danger collapse"
													style="display: none"
												>
													<span>Out of stock</span>
												</span>
											</div>
										</div>
									</div>

									<!-- <div class="product-info">
										<form method="post" class="cart">
											<div class="product-quantity-action">
												<h6>Quantity:</h6>
												<div class="product-quantity">
													<div class="cart-plus-minus">
														<button type="button" class="dec qtybutton minus">
															<i class="fa-solid fa-minus"></i>
														</button>
														<input type="text" name="quantity" value="1" />
														<button type="button" class="inc qtybutton plus">
															<i class="fa-solid fa-plus"></i>
														</button>
													</div>
												</div>
											</div>
										</form>
									</div> -->
									<div class="product-info">
										<div class="product-actions">
											<!-- pro-deatail button start -->
											<div class="pro-detail-button">
												<button
													type="button"
													class="btn add-to-cart ajax-spin-cart"
													on:click={handleAddToCart}
												>
													<span class="cart-title">Add to cart</span>
												</button>
											</div>

											<!-- pro-detail wishlist end -->
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- product detail end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="product-description-tab pro-style1">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="product-tab horizontal-tab">
						<div class="tab">
							<ul class="nav nav-tabs" role="tablist">
								<li role="presentation">
									<a href="#pro-dec" class="active" data-bs-toggle="tab">
										<h6>Description</h6>
									</a>
								</li>
								<li role="presentation">
									<a href="#pro-add-info" data-bs-toggle="tab">
										<h6>Additional info</h6>
									</a>
								</li>
								<li role="presentation">
									<a href="#pro-custom-content" data-bs-toggle="tab">
										<h6>Other content</h6>
									</a>
								</li>
								<li role="presentation">
									<a href="#pro-review" data-bs-toggle="tab">
										<h6>Reviews</h6>
									</a>
								</li>
								<li role="presentation">
									<a href="#product-video" data-bs-toggle="tab">
										<h6>Video</h6>
									</a>
								</li>
							</ul>
						</div>
						<div class="description-review-text tab-content">
							<div class="tab-pane active" id="pro-dec">
								<div class="product-description">
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
										Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
										fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
										culpa qui officia deserunt mollit anim id est laborum.
									</p>
									<h6>About this item</h6>
									<ul>
										<li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
										<li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
										<li>As Cicero would put it, “Um, not so fast.”</li>
										<li>
											Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
											adipisci velit.
										</li>
										<li>
											Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
											aliquam quaerat voluptatem.
										</li>
										<li>
											Nor is there anyone who loves or pursues or desires to obtain pain of itself.
										</li>
										<li>
											Because it is pain, but occasionally circumstances occur in which toil and
											pain can procure him some great pleasure.
										</li>
									</ul>
								</div>
							</div>
							<div class="tab-pane" id="pro-add-info">
								<div class="product-additional-info">
									<table>
										<tbody>
											<tr class="product-info">
												<th>Vendor</th>
												<td>
													<a href="javascript:void(0)">Banno</a>
												</td>
											</tr>
											<tr class="product-info">
												<th>Type</th>
												<td>
													<a href="javascript:void(0)">Bakery</a>
												</td>
											</tr>
											<tr class="product-info">
												<th>Color</th>
												<td>Decadent, Cheesecake, Vanilla</td>
											</tr>
											<tr class="product-info">
												<th>Sku</th>
												<td>abccd-13</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<div class="tab-pane" id="pro-custom-content">
								<div class="product-custom-content">
									<p>
										The purpose of lorem ipsum is to create a natural looking block of text
										(sentence, paragraph, page, etc.) that doesn't distract from the layout. A
										practice not without controversy, laying out pages with meaningless filler text
										can be very useful when the focus is meant to be on design, not content.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
										nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
									</p>
								</div>
							</div>
							<div class="tab-pane" id="pro-review">
								<div class="spr-container">
									<div class="spr-header">
										<h2 class="spr-header-title">Customer reviews</h2>
										<div class="product-rating">
											<span class="star-rating">
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star"></i>
												<i class="fas fa-star-half-alt"></i>
											</span>
											<span class="spr-summary-caption">
												<span class="spr-summary-actions-togglereviews">Based on 3 reviews</span>
											</span>
											<span class="spr-summary-actions">
												<a
													href="#add-review"
													data-bs-toggle="collapse"
													class="spr-summary-actions-newreview">Write a review</a
												>
											</span>
										</div>
										<!-- product-rating end -->
									</div>
									<div class="spr-content">
										<!-- spar-from start -->
										<div class="spr-form collapse" id="add-review">
											<form method="post" class="new-review-form">
												<h3 class="spr-form-title">Write a review</h3>
												<fieldset class="spr-form-contact">
													<div class="spr-form-contact-name">
														<label class="spr-form-label">Name</label>
														<input
															type="text"
															name="q"
															class="spr-form-input spr-form-input-text"
															placeholder="Enter your name"
														/>
													</div>
													<div class="spr-form-contact-email">
														<label class="spr-form-label">Email address</label>
														<input
															type="email"
															name="q"
															class="spr-form-input spr-form-input-email"
															placeholder="john.smith@example.com"
														/>
													</div>
												</fieldset>
												<fieldset class="spr-form-review">
													<div class="spr-form-review-rating">
														<label class="spr-form-label">Rating</label>
														<div class="product-rating">
															<span class="star-rating">
																<i class="far fa-star"></i>
																<i class="far fa-star"></i>
																<i class="far fa-star"></i>
																<i class="far fa-star"></i>
																<i class="far fa-star"></i>
															</span>
														</div>
													</div>
													<div class="spr-form-review-title">
														<label class="spr-form-label">Review title</label>
														<input
															type="text"
															name="q"
															class="spr-form-input spr-form-input-text"
															placeholder="Give your review a title"
														/>
													</div>
													<div class="spr-form-review-body">
														<label class="spr-form-label"
															>Body of review
															<span>
																<span class="spr-form-review-body-charactersremaining">(1500)</span>
															</span>
														</label>
														<div class="spr-form-input">
															<textarea
																class="spr-form-input spr-form-input-textarea"
																placeholder="Write your comments here"
																rows="10"
															></textarea>
														</div>
													</div>
												</fieldset>
												<fieldset class="spr-form-actions">
													<input
														type="button"
														name="q"
														class="spr-button spr-button-primary button button-primary btn btn-primary"
														value="Submit Review"
													/>
												</fieldset>
											</form>
										</div>
										<!-- spar-from end -->
										<!-- spr-reviews start -->
										<div class="spr-reviews">
											<div class="spr-review">
												<div class="product-rating">
													<span class="star-rating">
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
													</span>
													<h3 class="spr-review-header-title">
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
													</h3>
													<span class="spr-review-header-byline">
														<strong>David smith</strong>
														on
														<strong>Feb 18, 2023</strong>
													</span>
												</div>
												<div class="spr-review-content">
													<p class="spr-review-content-body">
														Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
														tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
														veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
														commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
														velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
														occaecat cupidatat non proident, sunt in culpa qui officia deserunt
														mollit anim id est laborum.
													</p>
												</div>
											</div>
											<div class="spr-review">
												<div class="product-rating">
													<span class="star-rating">
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="fas fa-star"></i>
														<i class="far fa-star"></i>
													</span>
													<h3 class="spr-review-header-title">Best for every time suger free</h3>
													<span class="spr-review-header-byline">
														<strong>David smith</strong>
														on
														<strong>Jan 25, 2023</strong>
													</span>
												</div>
												<div class="spr-review-content">
													<p class="spr-review-content-body">
														he purpose of lorem ipsum is to create a natural looking block of text
														(sentence, paragraph, page, etc.) that doesn't distract from the layout.
														A practice not without controversy, laying out pages with meaningless
														filler text can be very useful when the focus is meant to be on design,
														not content.
													</p>
												</div>
											</div>
										</div>
										<!-- spr-reviews end -->
									</div>
								</div>
							</div>
							<div class="tab-pane" id="product-video">
								<div class="video">
									<div class="video-wrapper">
										<iframe src="https://www.youtube.com/embed/0Aja_yP93PY" allowfullscreen
										></iframe>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="related-product">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="product-related">
						<!-- related-pro. title start -->
						<div class="section-capture">
							<div class="section-title">
								<div class="section-cont-title">
									<h2>
										<span>Related product</span>
									</h2>
								</div>
							</div>
						</div>
						<!-- related-pro. title end -->
						<!-- related-pro. slider start -->
						<div class="related-slider">
							<div class="product-related-slider swiper" id="related-slider">
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
														href="/wishlist"
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
						<!-- related-pro. slider start -->
					</div>
				</div>
			</div>
		</div>
	</section>
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
</main>
<!-- main section end-->
