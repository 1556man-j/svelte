<script>
	import { onMount } from 'svelte';
	import Quickview from '../components/Quickview.svelte';

	let modalProduct = null;

	function handleQuickView(event) {
		const el = event.currentTarget;

		modalProduct = {
			id: el.getAttribute('data-id'),
			name: el.getAttribute('data-name'),
			price: el.getAttribute('data-price'),
			image: el.getAttribute('data-image')
		};
		console.log('Selected product:', modalProduct);
	}

	onMount(() => {
		document.body.addEventListener('click', (e) => {
			const btn = e.target.closest('.wishlist-product');
			if (!btn) return;

			e.preventDefault();

			const id = btn.dataset.id;
			const name = btn.dataset.name;
			const price = btn.dataset.price;
			const image = btn.dataset.image;

			let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

			const exists = wishlist.some((item) => item.id === id);

			if (exists) {
				alert('Item already in wishlist!');
			} else {
				wishlist.push({ id, name, price, image });
				localStorage.setItem('wishlist', JSON.stringify(wishlist));
				alert('Added to wishlist!');

				// Dispatch custom event to notify other components
				window.dispatchEvent(new CustomEvent('wishlistUpdated'));
			}
		});

		// Wait until DOM is ready before running the JS
		const checkDOM = setInterval(() => {
			const exists = document.querySelector('.product-title h2');
			if (exists && window.loadProductData) {
				clearInterval(checkDOM);
				window.loadProductData(); // Run the function from your external JS
			}
		}, 100);

		const checkDOMU = setInterval(() => {
			const btn = document.querySelector('.wishlist-btn');
			if (btn && typeof window.dispatchWishlistUpdate === 'function') {
				btn.addEventListener('click', () => {
					setTimeout(() => {
						window.dispatchWishlistUpdate();
					}, 100); // slight delay to ensure localStorage updates
				});
				clearInterval(checkDOMU);
			}
		}, 100);

		// Initialize Owl Carousel if jQuery is available
		if (globalThis.$) {
			globalThis.$('#home-slider').owlCarousel({
				items: 1,
				loop: true,
				autoplay: true,
				autoplayTimeout: 5000,
				dots: true
			});
		} else {
			console.error("jQuery not found! Ensure it's loaded before Owl Carousel.");
		}

		// Initialize Swiper for product template
		if (globalThis.Swiper) {
			new Swiper('#pro-template', {
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

			// Initialize Swiper for blog template
			new Swiper('#blog-template', {
				slidesPerView: 1,
				spaceBetween: 20,
				pagination: {
					el: '.swiper-pagination',
					clickable: true
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev'
				},
				breakpoints: {
					640: { slidesPerView: 2 },
					1200: { slidesPerView: 3 }
				}
			});
		} else {
			console.error('Swiper is not loaded. Check your script link in app.html.');
		}

		// Initialize Slick Slider for testimonials with proper responsive settings
		if (globalThis.$) {
			globalThis.$('.slider-for').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				autoplay: true,
				autoplaySpeed: 3000,
				infinite: true,
				prevArrow: '<button class="slick-prev"><i class="fa fa-chevron-left"></i></button>',
				nextArrow: '<button class="slick-next"><i class="fa fa-chevron-right"></i></button>'
			});
		} else {
			console.error("jQuery not found! Ensure it's loaded before Slick Slider.");
		}
	});

	function handleAddToCart(event) {
		event.preventDefault();

		const target = event.currentTarget;

		const product = {
			id: target.dataset.id,
			name: target.dataset.name,
			price: parseFloat(target.dataset.price),
			image: target.dataset.image,
			quantity: 1
		};

		let cart = JSON.parse(localStorage.getItem('cart')) || [];

		const existing = cart.find((p) => p.id === product.id);
		if (existing) {
			existing.quantity += 1;
		} else {
			cart.push(product);
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		console.log('Cart updated:', cart); // Debugging log ✅

		// Dispatch custom event
		window.dispatchEvent(new CustomEvent('cartUpdated'));

		// Open mini-cart sidebar
		document.querySelector('.mini-cart')?.classList.add('active');
	}
</script>

<main>
	<Quickview {modalProduct} />
	<!-- home-slider start -->
	<section class="slider-content">
		<div class="home-slider owl-carousel owl-theme" id="home-slider">
			<div class="item">
				<div class="slide-image">
					<img
						src="/assets/img/slider/backery-slider-04.jpg"
						class="img-fluid desk-img"
						alt="backery-slider-04"
					/>
					<img
						src="/assets/img/slider/mobile-slider-04.jpg"
						class="img-fluid mobile-img"
						alt="mobile-slider-04"
					/>
					<div class="slider-info-content container">
						<div class="row">
							<div class="col">
								<div class="slider-text-info slider-content-left slider-text-left">
									<span class="sub-title e1">Sweet Moments, Flavorful Delights</span>
									<h2 class="e1 manj">Indulge in Every Bite</h2>
									<p class="e1">
										whether it’s the comforting warmth of a freshly baked snack, the rich flavors of
										our signature rice dishes, or the cool, refreshing sip of your favorite drink,
										every bite and sip at Crave & Crumble is made to delight your taste buds!
									</p>
									<a href="/collection" class="btn btn-style e1">Shop now</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="slide-image">
					<img
						src="/assets/img/slider/backery-slider-05.jpg"
						class="img-fluid desk-img"
						alt="backery-slider-05"
					/>
					<img
						src="/assets/img/slider/mobile-slider-05.jpg"
						class="img-fluid mobile-img"
						alt="mobile-slider-05"
					/>
					<div class="slider-info-content container">
						<div class="row">
							<div class="col">
								<div class="slider-text-info slider-content-left slider-text-left">
									<span class="sub-title e1"> Your Cravings, Our Creations</span>
									<h2 class="e1 manj">Craving Something Sweet?</h2>
									<p class="e1">
										Your treat awaits—whether it's a warm, freshly baked delight, a flavorful rice
										dish, or a refreshing drink, we have the perfect taste to satisfy every craving
										at Crave & Crumble!
									</p>
									<a href="/collection" class="btn btn-style e1">Shop now</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="item">
				<div class="slide-image">
					<img
						src="/assets/img/slider/backery-slider-06.jpg"
						class="img-fluid desk-img"
						alt="backery-slider-06"
					/>
					<img
						src="/assets/img/slider/mobile-slider-06.jpg"
						class="img-fluid mobile-img"
						alt="mobile-slider-06"
					/>
					<div class="slider-info-content container">
						<div class="row">
							<div class="col">
								<div class="slider-text-info slider-content-left slider-text-left">
									<span class="sub-title e1">We make life sweet</span>
									<h2 class="e1 manj">Baked to Perfection</h2>
									<p class="e1">
										Deliciously made, carefully packed, and delivered with love because you deserve
										only the best!
									</p>
									<a href="/collection" class="btn btn-style e1">Shop now</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- home-slider end -->
	<!-- slider-category start -->
	<section class="slider-category slider-category-template section-pt">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="section-capture">
						<div class="section-title">
							<span class="sub-title">Browse collection</span>
							<h2>
								<span>Shop BY CATEGORY</span>
							</h2>
						</div>
					</div>
					<div class="grid-wrap">
						<div class="grid-wrapper">
							<div class="cat-block">
								<a href="/collection" class="icon-block">
									<span class="cat-icon">
										<img
											src="/assets/img/collection/category-icon-01.png"
											class="img-fluid"
											alt="category-icon-01"
										/>
									</span>
									<span class="arrow-icon">
										<i class="feather-arrow-right"></i>
									</span>
								</a>
								<div class="title-block">
									<h6 class="cat-title">Main Dishes</h6>
									<p>
										Enjoy rich, flavorful rice dishes made with the finest ingredients and cooked to
										perfection. Whether you love classic Jollof or the rich taste of seafood, every
										bite is a taste of home!
									</p>
								</div>
								<a href="/collection" class="main-img">
									<span class="cat-count">12</span>
									<span class="cat-img">
										<img
											src="/assets/img/service/category-01.jpg"
											class="img-fluid"
											alt="category-01"
										/>
									</span>
								</a>
							</div>
						</div>
						<div class="grid-wrapper">
							<div class="cat-block">
								<a href="/collection" class="icon-block">
									<span class="cat-icon">
										<img
											src="/assets/img/collection/category-icon-02.png"
											class="img-fluid"
											alt="category-icon-02"
										/>
									</span>
									<span class="arrow-icon">
										<i class="feather-arrow-right"></i>
									</span>
								</a>
								<div class="title-block">
									<h6 class="cat-title">Savory Snacks</h6>
									<p>
										Freshly baked and packed with delicious fillings, our savory snacks are perfect
										for any time of the day. Whether you're craving a meaty bite or a vegan delight,
										we've got something for you!
									</p>
								</div>
								<a href="/collection" class="main-img">
									<span class="cat-count">12</span>
									<span class="cat-img">
										<img
											src="/assets/img/service/category-02.jpg"
											class="img-fluid"
											alt="category-02"
										/>
									</span>
								</a>
							</div>
						</div>
						<div class="grid-wrapper">
							<div class="cat-block">
								<a href="/collection" class="icon-block">
									<span class="cat-icon">
										<img
											src="/assets/img/collection/category-icon-03.png"
											class="img-fluid"
											alt="category-icon-03"
										/>
									</span>
									<span class="arrow-icon">
										<i class="feather-arrow-right"></i>
									</span>
								</a>
								<div class="title-block">
									<h6 class="cat-title">Sweet Treats</h6>
									<p>
										Crunchy, soft, and irresistibly sweet! Our handmade treats are perfect for
										satisfying your cravings, whether it's a bite of warm Puff Puff or the crunch of
										classic Chin Chin.
									</p>
								</div>
								<a href="/collection" class="main-img">
									<span class="cat-count">12</span>
									<span class="cat-img">
										<img
											src="/assets/img/service/category-03.jpg"
											class="img-fluid"
											alt="category-03"
										/>
									</span>
								</a>
							</div>
						</div>
						<div class="grid-wrapper">
							<div class="cat-block">
								<a href="/collection" class="icon-block">
									<span class="cat-icon">
										<img
											src="/assets/img/collection/category-icon-04.png"
											class="img-fluid"
											alt="category-icon-04"
										/>
									</span>
									<span class="arrow-icon">
										<i class="feather-arrow-right"></i>
									</span>
								</a>
								<div class="title-block">
									<h6 class="cat-title">Refreshing Drinks</h6>
									<p>
										Cool, refreshing, and made from the best natural ingredients. Whether you need a
										rich, fruity Zobo or a handcrafted cocktail, our drinks are the perfect way to
										unwind!
									</p>
								</div>
								<a href="/collection" class="main-img">
									<span class="cat-count">12</span>
									<span class="cat-img">
										<img
											src="/assets/img/service/category-04.jpg"
											class="img-fluid"
											alt="category-04"
										/>
									</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- slider-category end -->
	<!-- our-service-area start -->
	<section class="our-service-area section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<ul class="single-service">
						<li class="service-content">
							<div class="ser-block">
								<a href="/javascript:void(0)">
									<img
										src="/assets/img/service/banno-bakery-service-01.png"
										class="img-fluid"
										alt="banno-bakery-service-01"
									/>
								</a>
								<div class="service-text">
									<h6>FREE SHIPPING</h6>
									<p>We deliver happiness to your doorstep fast, fresh, and with free shipping!</p>
								</div>
							</div>
						</li>
						<li class="service-content">
							<div class="ser-block">
								<a href="/javascript:void(0)">
									<img
										src="/assets/img/service/banno-bakery-service-02.png"
										class="img-fluid"
										alt="banno-bakery-service-01"
									/>
								</a>
								<div class="service-text">
									<h6>SECURE PAYMENT</h6>
									<p>
										Your security is our priority—enjoy seamless and protected payments every time
										you order.
									</p>
								</div>
							</div>
						</li>
						<li class="service-content">
							<div class="ser-block">
								<a href="/javascript:void(0)">
									<img
										src="/assets/img/service/banno-bakery-service-03.png"
										class="img-fluid"
										alt="banno-bakery-service-01"
									/>
								</a>
								<div class="service-text">
									<h6>30 DAYS RETURN</h6>
									<p>
										Not satisfied? No problem! Enjoy hassle-free returns within 30 days of purchase.
									</p>
								</div>
							</div>
						</li>
						<li class="service-content">
							<div class="ser-block">
								<a href="/javascript:void(0)">
									<img
										src="/assets/img/service/banno-bakery-service-04.png"
										class="img-fluid"
										alt="banno-bakery-service-01"
									/>
								</a>
								<div class="service-text">
									<h6>NO COST EMI</h6>
									<p>"Shop now, pay later, get what you love now, pay in easy installments!</p>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
	<!-- our-service-area end -->
	<!-- product-page start -->
	<section class="special-category collection-category-template section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="collection-category">
						<div class="section-capture">
							<div class="section-title">
								<span class="sub-title">Popular collection</span>
								<h2><span>TRENDING PRODUCT</span></h2>
							</div>
						</div>
						<div class="collection-wrap">
							<div class="collection-slider swiper" id="pro-template">
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/4" class="pro-img">
													<img
														src="/assets/img/product/p-31.jpg"
														class="img-fluid img1"
														alt="p-31"
													/>
													<img
														src="/assets/img/product/p-32.jpg"
														class="img-fluid img2"
														alt="p-32"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/4">Free sugar toast</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€25.00</span>
													<span class="old-price">€45.00</span>
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
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/6" class="pro-img">
													<img
														src="/assets/img/product/p-35.jpg"
														class="img-fluid img1"
														alt="p-35"
													/>
													<img
														src="/assets/img/product/p-36.jpg"
														class="img-fluid img2"
														alt="p-36"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/6">The bread a fresh</a>
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
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/8" class="pro-img">
													<img
														src="/assets/img/product/p-39.jpg"
														class="img-fluid img1"
														alt="p-39"
													/>
													<img
														src="/assets/img/product/p-40.jpg"
														class="img-fluid img2"
														alt="p-40"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/8">Healthy cake pastry</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€44.00</span>
													<span class="old-price">€49.00</span>
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
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/10" class="pro-img">
													<img
														src="/assets/img/product/p-43.jpg"
														class="img-fluid img1"
														alt="p-43"
													/>
													<img
														src="/assets/img/product/p-44.jpg"
														class="img-fluid img2"
														alt="p-44"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/10">Crackers for rasmalai</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€61.00</span>
													<span class="old-price">€69.00</span>
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
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/12" class="pro-img">
													<img
														src="/assets/img/product/p-47.jpg"
														class="img-fluid img1"
														alt="p-47"
													/>
													<img
														src="/assets/img/product/p-48.jpg"
														class="img-fluid img2"
														alt="p-48"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/12">Fresh healthy doughnuts</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€69.00</span>
													<span class="old-price">€89.00</span>
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
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleQuickView}
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
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- product-page end -->
	<!-- custom-text start -->
	<section class="custom-text section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="custom-text-wrapper">
						<div class="custom-text-img">
							<div class="offer-img">
								<a href="/collection">
									<div class="banner-main">
										<span class="full-img">
											<img
												src="/assets/img/banner/about-us-01.png"
												class="img-fluid"
												alt="about-us-01"
											/>
										</span>
										<span class="anim-circle">
											<img
												src="/assets/img/banner/banner2-circle.png"
												class="img-fluid"
												alt="banner2-circle"
											/>
										</span>
									</div>
									<div class="banner-side">
										<img
											src="/assets/img/banner/about-us-02.png"
											class="img-fluid"
											alt="about-us-02"
										/>
									</div>
								</a>
							</div>
						</div>
						<div class="custom-text-content">
							<div class="custom-width">
								<span class="sub-title">Crave & Crumble</span>
								<h2>
									Every day, we cook, bake, and serve with love, bringing you the best in flavor and
									freshness.
								</h2>
								<p>
									Flavors come in many forms, but at Crave & Crumble, we perfect every bite whether
									it’s a hearty meal, a delightful snack, or a refreshing drink, all made with
									passion and care.
								</p>
								<a href="/collection" class="btn btn-style">READ STORY</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- custom-text end -->
	<!-- testimonial-area start -->
	<section class="testimonial-area section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="section-capture">
						<div class="section-title">
							<span class="sub-title">1030+ Customer reviews</span>
							<h2><span>Happy client say</span></h2>
						</div>
					</div>
					<div class="testi-slider">
						<div class="slick-slider slider-for slider-nav">
							<div class="slick-slide">
								<div class="testi-content">
									<span class="testi-img">
										<img
											src="/assets/img/testimonial/testi-04.png"
											class="img-fluid"
											alt="testi-04"
										/>
										<span class="quote-icon"></span>
									</span>
									<div class="testi-desc">
										<p>
											Crave & Crumble catered our event with a delightful spread, including their
											flavorful rice dishes, delicious snacks, and refreshing drinks. Every bite was
											fresh and perfectly made! We’ve been loyal customers for years, and we
											wouldn’t trust anyone else. Their food is always rich in flavor,
											well-prepared, and served with love!
										</p>
									</div>
									<div class="testi-review">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
									</div>
									<div class="author-title">
										<h6>Cherry Blossom</h6>
									</div>
								</div>
							</div>
							<div class="slick-slide">
								<div class="testi-content">
									<span class="testi-img">
										<img
											src="/assets/img/testimonial/testi-05.png"
											class="img-fluid"
											alt="testi-05"
										/>
										<span class="quote-icon"></span>
									</span>
									<div class="testi-desc">
										<p>
											The food was beautifully presented and absolutely delicious! Crave & Crumble
											perfectly executed our vision, delivering flavorful rice dishes, tasty snacks,
											and refreshing drinks. Our guests couldn’t stop raving about how amazing
											everything was all night!
										</p>
									</div>

									<div class="testi-review">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
									</div>
									<div class="author-title">
										<h6>Maureen John</h6>
									</div>
								</div>
							</div>
							<div class="slick-slide">
								<div class="testi-content">
									<span class="testi-img">
										<img
											src="/assets/img/testimonial/testi-06.png"
											class="img-fluid"
											alt="testi-06"
										/>
										<span class="quote-icon"></span>
									</span>
									<div class="testi-desc">
										<p>
											Crave & Crumble exceeded our expectations! The Jollof rice was bursting with
											flavor, and the seafood fried rice was a crowd favorite. Every bite was fresh
											and perfectly seasoned. We'll definitely be ordering again!
										</p>
									</div>
									<div class="testi-review">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
									</div>
									<div class="author-title">
										<h6>Ventila tomy</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- testimonial-area end -->
	<!-- featured product start-->
	<section class="special-category collection-category-template section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="collection-category">
						<div class="section-capture">
							<div class="section-title">
								<span class="sub-title">New trend collection</span>
								<h2><span>Featured product</span></h2>
							</div>
						</div>
						<div class="collection-wrap">
							<div class="collection-slider swiper" id="pro-template">
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/4" class="pro-img">
													<img
														src="/assets/img/product/p-31.jpg"
														class="img-fluid img1"
														alt="p-31"
													/>
													<img
														src="/assets/img/product/p-32.jpg"
														class="img-fluid img2"
														alt="p-32"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/4">Free sugar toast</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€25.00</span>
													<span class="old-price">€45.00</span>
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
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="4"
														data-name="Free sugar toast"
														data-price="25.00"
														data-image="/assets/img/product/p-31.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/6" class="pro-img">
													<img
														src="/assets/img/product/p-35.jpg"
														class="img-fluid img1"
														alt="p-35"
													/>
													<img
														src="/assets/img/product/p-36.jpg"
														class="img-fluid img2"
														alt="p-36"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/6">The bread a fresh</a>
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
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="6"
														data-name="The bread a fresh"
														data-price="25.00"
														data-image="/assets/img/product/p-35.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/8" class="pro-img">
													<img
														src="/assets/img/product/p-39.jpg"
														class="img-fluid img1"
														alt="p-39"
													/>
													<img
														src="/assets/img/product/p-40.jpg"
														class="img-fluid img2"
														alt="p-40"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/8">Healthy cake pastry</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€44.00</span>
													<span class="old-price">€49.00</span>
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
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="8"
														data-name="Healthy cake pastry"
														data-price="44.00"
														data-image="/assets/img/product/p-39.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/10" class="pro-img">
													<img
														src="/assets/img/product/p-43.jpg"
														class="img-fluid img1"
														alt="p-43"
													/>
													<img
														src="/assets/img/product/p-44.jpg"
														class="img-fluid img2"
														alt="p-44"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/10">Crackers for rasmalai</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€61.00</span>
													<span class="old-price">€69.00</span>
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
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="10"
														data-name="Crackers for rasmalai"
														data-price="61.00"
														data-image="/assets/img/product/p-43.jpg"
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
														on:click={handleAddToCart}
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
														on:click={handleQuickView}
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
												<a href="/product-template/12" class="pro-img">
													<img
														src="/assets/img/product/p-47.jpg"
														class="img-fluid img1"
														alt="p-47"
													/>
													<img
														src="/assets/img/product/p-48.jpg"
														class="img-fluid img2"
														alt="p-48"
													/>
												</a>
												<!-- product-action start -->
												<div class="product-action">
													<a
														href="/wishlist"
														class="wishlist-product"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleQuickView}
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
													<a href="/product-template/12">Fresh healthy doughnuts</a>
												</h6>
												<!-- product-title end -->
												<!-- product-price start -->
												<div class="price-box">
													<span class="new-price">€69.00</span>
													<span class="old-price">€89.00</span>
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
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
													>
														<span class="tooltip-text">Wishlist</span>
														<span class="wishlist-icon"><i class="feather-heart"></i></span>
													</a>
													<a
														href="javascript:void(0)"
														class="add-to-cart"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleAddToCart}
													>
														<span class="tooltip-text">Add to cart</span>
														<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
													</a>
													<a
														href="#quickview"
														class="quick-view"
														data-bs-toggle="modal"
														data-bs-target="#quickview"
														data-id="12"
														data-name="Fresh healthy doughnuts"
														data-price="69.00"
														data-image="/assets/img/product/p-47.jpg"
														on:click={handleQuickView}
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
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- featured product end-->
	<!-- blog start-->
	<section class="blog-wrap section-pt">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="section-capture">
						<div class="section-title">
							<span class="sub-title">Latest news &amp; story</span>
							<h2>A Positive blog</h2>
						</div>
					</div>
					<div class="blog-slider swiper" id="blog-template">
						<div class="swiper-wrapper">
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">14 May, 2024</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-01.jpg"
												class="img-fluid"
												alt="banno-blog-01"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article"> The Secret to Perfect Jollof Rice </a>
										</h6>
										<p>
											Discover the key ingredients and techniques that make Jollof Rice flavorful,
											rich, and...
										</p>
										<a href="article" class="read-btn btn btn-style2">
											<span>Read more</span>
										</a>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">19 June, 2024</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-02.jpg"
												class="img-fluid"
												alt="banno-blog-02"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article">Why Freshly Baked Snacks Taste Better </a>
										</h6>
										<p>
											From meat pies to donuts, find out why freshly made snacks have the best
											texture and taste...
										</p>
										<a href="article" class="read-btn btn btn-style2">
											<span>Read more</span>
										</a>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">10 November, 2024</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-03.jpg"
												class="img-fluid"
												alt="banno-blog-03"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article">Zobo vs. Cocktails: Which Drink is Right for You?</a>
										</h6>
										<p>
											A deep dive into these refreshing drinks, their unique flavors, and when to
											enjoy them...
										</p>
										<a href="article" class="read-btn btn btn-style2">
											<span>Read more</span>
										</a>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">1 December, 2024</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-04.jpg"
												class="img-fluid"
												alt="banno-blog-04"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article">5 Must-Try Snacks for Every Food Lover</a>
										</h6>
										<p>
											Whether you're craving something savory or sweet, these snacks from Crave &
											Crumble are a must-try...
										</p>
										<a href="article" class="read-btn btn btn-style2">
											<span>Read more</span>
										</a>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">20 December, 2024</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-05.jpg"
												class="img-fluid"
												alt="banno-blog-05"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article">How to Pair Your Meal with the Perfect Drink </a>
										</h6>
										<p>
											Find out which drinks go best with Jollof rice, fried rice, and your favorite
											snacks...
										</p>
										<a href="article" class="read-btn btn btn-style2">
											<span>Read more</span>
										</a>
									</div>
								</div>
							</div>
							<div class="swiper-slide">
								<div class="blog-post">
									<div class="blog-main-img">
										<div class="top-block">
											<span class="date-time">4 January, 2025</span>
											<span>By Crave & Crumble</span>
										</div>
										<a href="/article" class="blog-img">
											<img
												src="/assets/img/blog/banno-blog-06.jpg"
												class="img-fluid"
												alt="banno-blog-06"
											/>
											<span class="blog-icon"><i class="bi bi-link-45deg"></i></span>
										</a>
									</div>
									<div class="blog-post-content">
										<div class="blog-tag">
											<ul>
												<li>
													<a href="/article">antiquestore</a>
												</li>
												<li>
													<a href="/article">blog</a>
												</li>
												<li>
													<a href="/article">homeaccessories</a>
												</li>
											</ul>
										</div>
										<h6 class="blog-title">
											<a href="/article">The Magic of Homemade Meals vs. Fast Food </a>
										</h6>
										<p>
											Nothing beats the rich taste and quality of freshly prepared meals—see why
											homemade always wins...
											<a href="article" class="read-btn btn btn-style2">
												<span>Read more</span>
											</a>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- blog end-->
	<!-- newsletter start -->
	<section class="newsletter-sec section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="news-block">
						<div class="section-title">
							<span class="sub-title">Join our newsletter</span>
							<h2>Be the First to Get Exclusive Deals & Updates</h2>
						</div>
						<form method="post" class="contact-form">
							<div class="newsletter">
								<div class="subscribe-content">
									<div class="subscribe-block">
										<input
											type="email"
											name="contact[email]"
											class="email mail"
											id="E-mail"
											value=""
											placeholder="Enter your mail"
											autocapitalize="off"
											required=""
										/>
										<button type="submit" class="sub-btn" name="commit" id="Subscribe">
											Subscribe
										</button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- newsletter end -->
</main>

<style>
	.manj {
		color: #333333 !important;
	}
</style>
