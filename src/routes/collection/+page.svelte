<script>
	import { onMount } from 'svelte';

	onMount(() => {
		// Wait until DOM is ready before running the JS
		const checkDOM = setInterval(() => {
			const exists = document.querySelector('.product-title h2');
			if (exists && window.loadProductData) {
				clearInterval(checkDOM);
				window.loadProductData(); // Run the function from your external JS
				sortProducts(sortBy);
			
			}
		}, 100);

		if (window.jQuery) {
			jQuery('#insta-slider').owlCarousel({
				loop: true,
				margin: 30,
				nav: true,
				dots: true,
				autoplay: true,
				autoplayTimeout: 3000,
				responsive: {
					0: {
						items: 2
					},
					479: {
						items: 3
					},
					979: {
						items: 4
					},
					1199: {
						items: 5
					}
				}
			});
		} else {
			console.error("jQuery not found! Make sure it's loaded before initializing Owl Carousel.");
		}

		
	});

	// Initialize the selected sort value and view mode
	let sortBy = 'manual';
  let selectedSortLabel = 'Featured';
  let gridView = 3; // 3 for grid view, 1 for list view

  // Sort options map
  const criteriaMap = {
    'Featured': 'manual',
    'Best Selling': 'best-selling',
    'Alphabetically, A-Z': 'title-ascending',
    'Alphabetically, Z-A': 'title-descending',
    'Price, low to high': 'price-ascending',
    'Price, high to low': 'price-descending',
  };

  // Function to handle sorting changes
  const handleSortChange = (value) => {
    selectedSortLabel = Object.keys(criteriaMap).find(key => criteriaMap[key] === value);
    sortProducts(value);
  };

  // Function to handle sorting of the product list
  const sortProducts = (option) => {
    const productList = document.querySelectorAll('.st-col-item'); // Static products list
    const productArray = Array.from(productList);

    if (option === 'price-ascending') {
      productArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.new-price').innerText.replace('€', ''));
        const priceB = parseFloat(b.querySelector('.new-price').innerText.replace('€', ''));
        return priceA - priceB;
      });
    } else if (option === 'price-descending') {
      productArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.new-price').innerText.replace('€', ''));
        const priceB = parseFloat(b.querySelector('.new-price').innerText.replace('€', ''));
        return priceB - priceA;
      });
    } else if (option === 'title-ascending') {
      productArray.sort((a, b) => {
        const nameA = a.querySelector('h6 a').innerText.toLowerCase();
        const nameB = b.querySelector('h6 a').innerText.toLowerCase();
        return nameA.localeCompare(nameB);
      });
    } else if (option === 'title-descending') {
      productArray.sort((a, b) => {
        const nameA = a.querySelector('h6 a').innerText.toLowerCase();
        const nameB = b.querySelector('h6 a').innerText.toLowerCase();
        return nameB.localeCompare(nameA);
      });
    }

    // Reattach the sorted products to the container
    const productContainer = document.getElementById('product-grid');
    productArray.forEach(product => productContainer.appendChild(product));
  };

  // Function to change the grid view (1 = list view, 3 = grid view)
  const changeGridView = (viewMode) => {
    gridView = viewMode;
  };
  //  Fix for desktop dropdown list sorting
  const handleListClick = (label) => {
    selectedSortLabel = label;
    sortBy = criteriaMap[label];
    handleSortChange(sortBy); // Triggers sorting
  };
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
							<h2>Collection</h2>
						</div>
						<!-- breadcrumb main-title end-->
						<!-- breadcrumb-list start -->
						<ul class="breadcrumb-list">
							<li class="breadcrumb-item-link">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item-link">
								<span>Collection</span>
							</li>
						</ul>
						<!-- breadcrumb-list end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- breadcrumb end -->
	<section class="main-content-wrap shop-page section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="pro-grli-wrapper left-side-wrap">
						<div class="pro-grli-wrap product-grid">
							<div class="collection-img-wrap">
								<h6 class="st-title">Collection</h6>
								<!-- collection info start -->
								<div class="collection-info">
									<div class="collection-image">
										<img
											src="/assets/img/collection/collection-banner-01.jpg"
											class="img-fluid"
											alt="collection-banner-01"
										/>
									</div>
								</div>
								<!-- collection info end -->
							</div>
							<!-- shop-top-bar start -->
							<div class="shop-top-bar collection">
								<div class="product-filter without-sidebar">
									<button class="filter-button" type="button">
										<i class="feather-filter"></i><span>Filter</span>
									</button>
								</div>
								<div class="product-view-mode">
									<!-- shop-item-filter-list start -->
									<a
										href="javascript:void(0)"
										class="list-change-view grid-three {gridView === 3 ? 'active' : ''}"
										data-grid-view="3"
										on:click={() => changeGridView(3)}
									>
										<i class="feather-grid"></i>
									</a>

									<a
										href="javascript:void(0)"
										class="list-change-view list-one {gridView === 1 ? 'active' : ''}"
										data-grid-view="1"
										on:click={() => changeGridView(1)}
									>
										<i class="feather-list"></i>
									</a>
									<!-- shop-item-filter-list end -->
								</div>
								<!-- product-short start -->
								<div class="product-short">
									<label for="SortBy">Sort by:</label>
									<select
										class="nice-select"
										name="sortby"
										id="SortBy"
										bind:value={sortBy}
										on:change={() => handleSortChange(sortBy)}
									>
										<option value="manual">Featured</option>
										<option value="best-selling">Best Selling</option>
										<option value="title-ascending"> Alphabetically, A-Z </option>
										<option value="title-descending"> Alphabetically, Z-A </option>
										<option value="price-ascending"> Price, low to high </option>
										<option value="price-descending"> Price, high to low </option>
									</select>
									<a href="javascript:void(0)" class="short-title">
										<span class="sort-title">{selectedSortLabel}</span>
										<span class="sort-icon"><i class="bi bi-chevron-down"></i></span>
									</a>
									<a href="javascript:void(0)" class="short-title short-title-lg">
										<span class="sort-title">{selectedSortLabel}</span>
										<span class="sort-icon"><i class="bi bi-chevron-down"></i></span>
									</a>
									<ul class="collapse" role="list" id="select-wrap">
										{#each Object.entries(criteriaMap) as [label, value]}
											<li class:selected={sortBy === value}>
												<a href="javascript:void(0)" on:click={() => handleListClick(label)}>
													{label}
												</a>
											</li>
										{/each}
									</ul>
								</div>
								<!-- product-short end -->
							</div>
							<!-- shop-top-bar end -->
							<div class="get-data-products">
								<div class="shop-grid">
									<div id="ProductGridContainer">
										<div class="product-grid-view">
											<div class="shop-product-wrap collection grid-3 {gridView === 3 ? 'grid-3' : 'grid-1'}">
												<div class="row">
													<div class="col">
														<ul class="product-view" id="product-grid">
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/1" class="pro-img">
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
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
																			</a>
																			<a
																				href="#quickview"
																				class="quick-view"
																				data-bs-toggle="modal"
																				data-bs-target="#quickview"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/1">Candy nut chocolate</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€11,00</span>
																			<span class="old-price">€19,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
																			</a>
																			<a
																				href="#quickview"
																				class="quick-view"
																				data-bs-toggle="modal"
																				data-bs-target="#quickview"
																				data-id="1"
																				data-name="Candy nut chocolate"
																				data-price="11.00"
																				data-image="/assets/img/product/p-1.jpg"
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/2" class="pro-img">
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
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="2"
																				data-name="A bakery doughnuts"
																				data-price="21.00"
																				data-image="/assets/img/product/p-27.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
																		<!-- product-rating start-->
																		<div class="product-rating">
																			<span class="star-rating">
																				<i class="fas fa-star"></i>
																				<i class="fas fa-star"></i>
																				<i class="fas fa-star"></i>
																				<i class="fas fa-star"></i>
																				<i class="fas fa-star"></i>
																			</span>
																		</div>
																		<!-- product-rating end -->
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/2">A bekery doughnuts</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€21,00</span>
																			<span class="old-price">€25,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="2"
																				data-name="A bakery doughnuts"
																				data-price="21.00"
																				data-image="/assets/img/product/p-27.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/3" class="pro-img">
																			<img
																				src="/assets/img/product/p-5.jpg"
																				class="img-fluid img1"
																				alt="p-5"
																			/>
																			<img
																				src="/assets/img/product/p-6.jpg"
																				class="img-fluid img2"
																				alt="p-6"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="3"
																				data-name="Fresh bread toast"
																				data-price="24.00"
																				data-image="/assets/img/product/p-29.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/3">Fresh bread toast</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€24,00</span>
																			<span class="old-price">€29,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="3"
																				data-name="Fresh bread toast"
																				data-price="24.00"
																				data-image="/assets/img/product/p-29.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/4" class="pro-img">
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
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="4"
																				data-name="Free sugar toast"
																				data-price="25.00"
																				data-image="/assets/img/product/p-31.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="4"
																				data-name="Free sugar toast"
																				data-price="25.00"
																				data-image="/assets/img/product/p-31.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/4">Free sugar toast</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€25,00</span>
																			<span class="old-price">€45,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="4"
																				data-name="Free sugar toast"
																				data-price="25.00"
																				data-image="/assets/img/product/p-31.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="4"
																				data-name="Free sugar toast"
																				data-price="25.00"
																				data-image="/assets/img/product/p-31.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/5" class="pro-img">
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
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="5"
																				data-name="Jamun fruit pastry"
																				data-price="25.00"
																				data-image="/assets/img/product/p-34.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/5">The bread a fresh</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€25,00</span>
																			<span class="old-price">€35,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="5"
																				data-name="Jamun fruit pastry"
																				data-price="25.00"
																				data-image="/assets/img/product/p-34.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/6" class="pro-img">
																			<img
																				src="/assets/img/product/p-11.jpg"
																				class="img-fluid img1"
																				alt="p-11"
																			/>
																			<img
																				src="/assets/img/product/p-12.jpg"
																				class="img-fluid img2"
																				alt="p-12"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="6"
																				data-name="The bread a fresh"
																				data-price="25.00"
																				data-image="/assets/img/product/p-35.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="6"
																				data-name="The bread a fresh"
																				data-price="25.00"
																				data-image="/assets/img/product/p-35.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/6">Jamun fruit pastry</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€25,00</span>
																			<span class="old-price">€35,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="6"
																				data-name="The bread a fresh"
																				data-price="25.00"
																				data-image="/assets/img/product/p-35.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="6"
																				data-name="The bread a fresh"
																				data-price="25.00"
																				data-image="/assets/img/product/p-35.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/7" class="pro-img">
																			<img
																				src="/assets/img/product/p-13.jpg"
																				class="img-fluid img1"
																				alt="p-13"
																			/>
																			<img
																				src="/assets/img/product/p-14.jpg"
																				class="img-fluid img2"
																				alt="p-14"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="7"
																				data-name="Sandwich olka bread"
																				data-price="31.00"
																				data-image="/assets/img/product/p-37.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/7">Sandwich olka bread</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€31,00</span>
																			<span class="old-price">€39,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="7"
																				data-name="Sandwich olka bread"
																				data-price="31.00"
																				data-image="/assets/img/product/p-37.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/8" class="pro-img">
																			<img
																				src="/assets/img/product/p-15.jpg"
																				class="img-fluid img1"
																				alt="p-15"
																			/>
																			<img
																				src="/assets/img/product/p-16.jpg"
																				class="img-fluid img2"
																				alt="p-16"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="8"
																				data-name="Healthy cake pastry"
																				data-price="44.00"
																				data-image="/assets/img/product/p-39.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="8"
																				data-name="Healthy cake pastry"
																				data-price="44.00"
																				data-image="/assets/img/product/p-39.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/8">Healthy cake pastry</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€44,00</span>
																			<span class="old-price">€49,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="8"
																				data-name="Healthy cake pastry"
																				data-price="44.00"
																				data-image="/assets/img/product/p-39.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="8"
																				data-name="Healthy cake pastry"
																				data-price="44.00"
																				data-image="/assets/img/product/p-39.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/9" class="pro-img">
																			<img
																				src="/assets/img/product/p-17.jpg"
																				class="img-fluid img1"
																				alt="p-17"
																			/>
																			<img
																				src="/assets/img/product/p-18.jpg"
																				class="img-fluid img2"
																				alt="p-18"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="9"
																				data-name="Creamy for rasmalai"
																				data-price="54.00"
																				data-image="/assets/img/product/p-41.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/9">Creamy for rasmalai</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€44,00</span>
																			<span class="old-price">€49,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="9"
																				data-name="Creamy for rasmalai"
																				data-price="54.00"
																				data-image="/assets/img/product/p-41.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/10" class="pro-img">
																			<img
																				src="/assets/img/product/p-19.jpg"
																				class="img-fluid img1"
																				alt="p-19"
																			/>
																			<img
																				src="/assets/img/product/p-20.jpg"
																				class="img-fluid img2"
																				alt="p-20"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="10"
																				data-name="Crackers for rasmalai"
																				data-price="61.00"
																				data-image="/assets/img/product/p-43.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="10"
																				data-name="Crackers for rasmalai"
																				data-price="61.00"
																				data-image="/assets/img/product/p-43.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/10">Red sugar biscuit</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€61,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="10"
																				data-name="Crackers for rasmalai"
																				data-price="61.00"
																				data-image="/assets/img/product/p-43.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="10"
																				data-name="Crackers for rasmalai"
																				data-price="61.00"
																				data-image="/assets/img/product/p-43.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/11" class="pro-img">
																			<img
																				src="/assets/img/product/p-21.jpg"
																				class="img-fluid img1"
																				alt="p-21"
																			/>
																			<img
																				src="/assets/img/product/p-22.jpg"
																				class="img-fluid img2"
																				alt="p-22"
																			/>
																		</a>
																		<!-- product-label start -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="11"
																				data-name="Red sugar biscuit"
																				data-price="61.00"
																				data-image="/assets/img/product/p-45.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a href="javascript:void(0)" class="add-to-cart">
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/11">Crackers for rasmalai</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€61,00</span>
																			<span class="old-price">€69,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="11"
																				data-name="Red sugar biscuit"
																				data-price="61.00"
																				data-image="/assets/img/product/p-45.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
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
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
															<li class="st-col-item">
																<div class="single-product-wrap">
																	<!-- product-img start -->
																	<div class="product-image">
																		<a href="/product-template/12" class="pro-img">
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
																		<!-- product-label start -->
																		<!-- <div class="product-label">
                                                                                  <span class="new-sale-title">New</span>
                                                                              </div> -->
																		<!-- product-label end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="12"
																				data-name="Fresh healthy doughnuts"
																				data-price="69.00"
																				data-image="/assets/img/product/p-47.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="12"
																				data-name="Fresh healthy doughnuts"
																				data-price="69.00"
																				data-image="/assets/img/product/p-47.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-img end -->
																	<!-- product-content start -->
																	<div class="product-content">
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
																		<!-- product-title start -->
																		<h6>
																			<a href="/product-template/12">Fresh healthy doughnuts</a>
																		</h6>
																		<!-- product-title end -->
																		<!-- product-price start -->
																		<div class="price-box">
																			<span class="new-price">€69,00</span>
																			<span class="old-price">€89,00</span>
																		</div>
																		<!-- product-price end -->
																		<!-- product-description start -->
																		<p class="product-description">
																			The purpose of lorem ipsum is to create a natural looking
																			block of text (sentence, paragraph, page, etc.) that doesn't
																			distract from the layout. A practice not without controversy,
																			laying out pages with meaningless filler...
																		</p>
																		<!-- product-description end -->
																		<!-- product-action start -->
																		<div class="product-action">
																			<a
																				href="#"
																				class="wishlist-product"
																				data-id="12"
																				data-name="Fresh healthy doughnuts"
																				data-price="69.00"
																				data-image="/assets/img/product/p-47.jpg"
																			>
																				<span class="tooltip-text">Wishlist</span>
																				<span class="wishlist-icon"
																					><i class="feather-heart"></i></span
																				>
																			</a>
																			<a
																				href="javascript:void(0)"
																				class="add-to-cart"
																				data-id="12"
																				data-name="Fresh healthy doughnuts"
																				data-price="69.00"
																				data-image="/assets/img/product/p-47.jpg"
																			>
																				<span class="tooltip-text">Add to cart</span>
																				<span class="cart-icon"
																					><i class="feather-shopping-bag"></i></span
																				>
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
																			>
																				<span class="tooltip-text">Quick view</span>
																				<span class="quickview-icon"
																					><i class="feather-eye"></i></span
																				>
																			</a>
																		</div>
																		<!-- product-action end -->
																	</div>
																	<!-- product-content end -->
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
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