<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let cartCount = 0;
	let wishlistCount = 0;

	function updateCartCount() {
		const storedCart = localStorage.getItem('cart');
		const cart = storedCart ? JSON.parse(storedCart) : [];
		cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	}
	function handleCartUpdated() {
		updateCartCount();
	}

	function updateWishlistCount() {
		const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
		wishlistCount = wishlist.length;
	}

	onMount(() => {
		// Wait until DOM is ready before running the JS
		const checkDOM = setInterval(() => {
			const exists = document.querySelector('.product-title h2');
			if (exists && window.loadProductData) {
				clearInterval(checkDOM);
				window.loadProductData(); // Run the function from your external JS
			}
		}, 100);

		updateCartCount();
		window.addEventListener('cartUpdated', handleCartUpdated);
		updateWishlistCount();

		window.addEventListener('storage', (event) => {
			if (event.key === 'wishlist') {
				updateWishlistCount();
			}
		});
    window.addEventListener('wishlistUpdated', () => {
      updateWishlistCount();
    });
	});
</script>

<!-- notification-bottom start -->
<div class="notification-bottom">
	<ul class="shop-element-menu navigation-menu">
		<li class="side-wrap home-wrap">
			<div class="home-wrapper">
				<a href="/" class="home-modal">
					<span class="home-icon"><i class="feather-home"></i></span>
					<span class="header-title">Home</span>
				</a>
			</div>
		</li>
		<li class="side-wrap search-wrap">
			<div class="search-wrapper">
				<a href="#seachmodal" data-bs-toggle="modal" class="search-modal">
					<span class="search-icon"><i class="feather-search"></i></span>
					<span class="header-title">Search</span>
				</a>
			</div>
		</li>
		<li class="side-wrap wishlist-wrap">
			<div class="wishlist-wrapper">
				<div class="wish-det">
					<a href="/wishlist" class="wishlist-count">
						<span class="wishlist-icon"><i class="feather-heart"></i></span>
						<span class="wishlist-counter">{wishlistCount}</span>
						<span class="header-title">Wishlist</span>
					</a>
				</div>
			</div>
		</li>
		<li class="side-wrap cart-wrap">
			<div class="cart-wrapper">
				<div class="cart-det">
					<a href="javascript:void(0)" class="shopping-cart js-cart-drawer cart-count">
						<span class="cart-icon"><i class="feather-shopping-bag"></i></span>
						<span class="cart-counter" id="bottom-counters">{cartCount}</span>
						<span class="header-title">Cart</span>
					</a>
				</div>
			</div>
		</li>
		<li class="side-wrap user-wrap">
			<div class="user-wrapper">
				<a href="/login" class="user-login">
					<span class="user-icon"><i class="feather-user"></i></span>
					<span class="header-title">User</span>
				</a>
			</div>
		</li>
	</ul>
</div>
<!-- notification-bottom end -->
