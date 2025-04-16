<script>
	import { onMount } from 'svelte';

	let wishlist = [];
	let cart = [];

	// Function to load wishlist from localStorage
	function loadWishlist() {
		wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
	}

	// Function to load cart from localStorage
	function loadCart() {
		cart = JSON.parse(localStorage.getItem('cart')) || [];
	}

	// Function to update wishlist count
	function updateWishlistCount() {
		const count = wishlist.length;
		const counters = document.querySelectorAll('.wishlist-counter');
		counters.forEach((counter) => (counter.textContent = count));
	}

	// Function to add item to cart
	function addToCart(productId) {
		const product = wishlist.find((item) => item.id === productId);
		if (!product) {
			console.error('Product not found in wishlist.');
    return;
		}

		const existingCartItem = cart.find((item) => item.id === productId);
		if (existingCartItem) {
			existingCartItem.quantity += 1;
		} else {
			cart.push({ ...product, quantity: 1 });
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		window.dispatchEvent(new CustomEvent('cartUpdated', {
      detail: { product }
    }));

    // Open mini-cart sidebar
		document.querySelector('.mini-cart')?.classList.add('active');
	
	}

	// Function to remove an item from the wishlist
	function removeFromWishlist(productId) {
		wishlist = wishlist.filter((item) => item.id !== productId);
		localStorage.setItem('wishlist', JSON.stringify(wishlist));
		updateWishlistCount();
	}

	// Function to clear wishlist
	function clearWishlist() {
		if (confirm('Are you sure you want to clear your wishlist?')) {
			localStorage.removeItem('wishlist');
			wishlist = [];
			updateWishlistCount();
		}
	}

	// Event handler for storage changes
	function handleStorageEvent(event) {
		if (event.key === 'wishlist') {
			loadWishlist();
			updateWishlistCount();
		}
	}

	onMount(() => {
		loadWishlist();
		loadCart();
		updateWishlistCount();

		window.addEventListener('storage', handleStorageEvent);
		window.addEventListener('pageshow', () => {
			loadWishlist();
			updateWishlistCount();
		});
	});
</script>

<!-- Main Section Start -->
<main>
	<!-- Breadcrumb Start -->
	<section class="breadcrumb-area">
		<div class="container">
			<div class="col">
				<div class="row">
					<div class="breadcrumb-index">
						<!-- Breadcrumb Title Start -->
						<div class="breadcrumb-title">
							<h2>Wishlist</h2>
						</div>
						<!-- Breadcrumb Title End -->
						<!-- Breadcrumb List Start -->
						<ul class="breadcrumb-list">
							<li class="breadcrumb-item-link">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item-link">
								<span>Wishlist</span>
							</li>
						</ul>
						<!-- Breadcrumb List End -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- Breadcrumb End -->

	<!-- Wishlist Section -->
	<section class="customer-page section-ptb">
		<div class="container">
			<div class="row">
				<div class="col">
					<div class="wishlist-page">
						<div class="wishlist-grid is_visible">
							<div class="wish-wrap">
								<!-- Wishlist Title -->
								<div class="wishlist-title">
									<h6>My Wishlist:</h6>
									<span class="wish-count">
										<span class="wishlist-counter">{wishlist.length}</span>
										<span class="wish-item-title">Item(s)</span>
									</span>
								</div>

								<!-- Wishlist Products -->
								<!-- Wishlist Items -->
								{#if wishlist.length === 0}
									<p>Your wishlist is empty.</p>
								{:else}
									<div class="wishlist-tile-container">
										{#each wishlist as product}
											<ul class="wishlist-container">
												<li class="wishlist-info">
													<div class="item-img">
														<a href="javascript:void(0)">
															<img src={product.image} class="img-fluid" alt={product.name} />
														</a>
													</div>
													<div class="item-title">
														<a href="javascript:void(0)">{product.name}</a>
													</div>
												</li>
												<li class="item-add-remove">
													<div class="item-add">
														<a
															href="javascript:void(0)"
															class="add-to-cart"
															on:click={() => addToCart(product.id)}
														>
															<span>
																<span class="cart-title">Add to cart</span>
															</span>
														</a>
													</div>
												</li>
												<li class="item-price">
													<div class="price-box">
														<span class="new-price">€{product.price}</span>
														<span class="old-price">€{(product.price * 1.2).toFixed(2)}</span>
													</div>
													<span class="item-remove">
														<a
															href="javascript:void(0)"
															class="action-wishlist wishlist-btn text-danger is-active"
															on:click={() => removeFromWishlist(product.id)}
														>
															<span class="remove-wishlist"><i class="fa fa-trash"></i></span>
														</a>
													</span>
												</li>
											</ul>
										{/each}
									</div>
								{/if}

								<!-- Wishlist Buttons -->
								<div class="wishlist-buttons">
									<a href="/collection" class="btn-style2">Continue shopping</a>
									<a
										href="javascript:void(0)"
										class="btn-style2 clear-wishlist"
										on:click={clearWishlist}>Clear wishlist</a
									>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
<!-- Main Section End -->
