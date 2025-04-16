<script>
	import { onMount } from 'svelte';

	let cartItems = [];
	let totalItems = 0;
	let totalPrice = 0;

	function loadCart() {
		const cart = JSON.parse(localStorage.getItem('cart')) || [];
		cartItems = cart;
		totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
		totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
	}

	function updateCart() {
		localStorage.setItem('cart', JSON.stringify(cartItems));
		loadCart();
		window.dispatchEvent(new CustomEvent('cartUpdated'));
	}

	function increaseQuantity(id) {
		const item = cartItems.find((p) => p.id === id);
		if (item) {
			item.quantity += 1;
			updateCart();
		}
	}

	function decreaseQuantity(id) {
		const item = cartItems.find((p) => p.id === id);
		if (item && item.quantity > 1) {
			item.quantity -= 1;
			updateCart();
		}
	}

	function removeItem(id) {
		cartItems = cartItems.filter((p) => p.id !== id);
		updateCart();
	}

	onMount(() => {
		loadCart();

		window.addEventListener('cartUpdated', () => {
			loadCart();
		});

		// Listen for 'storage' events to handle changes from other tabs/windows
		window.addEventListener('storage', (event) => {
			if (event.key === 'cart') {
				loadCart();
			}
		});

		document.querySelector('.cart-close')?.addEventListener('click', () => {
			document.querySelector('.mini-cart')?.classList.remove('active');
		});
	});

	// Action to detect clicks outside the specified node
	function clickOutside(node) {
		const handleClick = (event) => {
			if (!node.contains(event.target)) {
				node.classList.remove('active'); // Close the miniCart
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}

	function closeMiniCart() {
		const miniCart = document.getElementById('mini-cart');
		if (miniCart && miniCart.classList.contains('active')) {
			miniCart.classList.remove('active');
		}
	}
</script>

<!-- mini-cart start -->
<div id="mini-cart"  class="mini-cart use:clickOutside">
	<div class="cart-text">
		<p class={cartItems.length ? 'd-none' : ''}>No products in the cart.</p>
		<p class={cartItems.length ? '' : 'd-none'}>
			<span class="cart-count-desc">There are</span>
			<span class="cart-counters">{totalItems}</span>
			<span class="cart-count-desc">products</span>
		</p>
		<button class="cart-close"><i class="feather-x"></i></button>
	</div>

	<div class={'empty-cart ' + (cartItems.length ? 'd-none' : '')}>
		<span class="cart-icon"><i class="bi bi-bag-dash"></i></span>
		<a href="/collection" class="btn btn-style">Continue shopping</a>
	</div>

	<ul class="cart-item" id="cart-items">
		{#each cartItems as item}
			<li class="cart-product item-info">
				<div class="item-img cart-img">
					<a href="javascript:void(0)" class="img-area">
						<img src={item.image} class="img-fluid" alt={item.name} />
					</a>
				</div>
				<div class="cart-content item-title">
					<div class="info">
						<h6>{item.name}</h6>
						<div class="product-info">
							<div class="info-item">
								<span class="product-qty">{item.quantity}</span>
								<span>×</span>
								<span class="product-price">€{parseFloat(item.price).toFixed(2)}</span>
							</div>
						</div>
					</div>
					<div class="product-quantity-action">
						<div class="product-quantity">
							<div class="cart-plus-minus">
								<button class="dec qtybutton minus" on:click={() => decreaseQuantity(item.id)}>
									<i class="feather-minus"></i>
								</button>
								<input type="text" name="quantity" value={item.quantity} disabled />
								<button class="inc qtybutton plus" on:click={() => increaseQuantity(item.id)}>
									<i class="feather-plus"></i>
								</button>
							</div>
						</div>
						<div class="delete-cart item-remove">
							<a
								href="javascript:void(0)"
								class="delete-icon text-danger remove-item"
								on:click={() => removeItem(item.id)}
							>
								<i class="feather-trash-2"></i>
							</a>
						</div>
					</div>
				</div>
			</li>
		{/each}
	</ul>

	<ul class="subtotal-area">
		<li class="subtotal-info">
			<div class="subtotal-titles">
				<h6 class="cart-total">Subtotal:</h6>
				<span class="subtotal-price">€{parseFloat(totalPrice).toFixed(2)}</span>
			</div>
		</li>
		<li class="mini-info">
			<label class="box-area">
				<span class="agree-text">
					I have read and agree with the
					<a href="/terms-condition">terms & condition.</a>
				</span>
				<input type="checkbox" class="cust-checkbox" />
				<span class="cust-check"></span>
			</label>
			<div class="cart-btn">
				<a href="/cart" class="btn btn-style2" on:click={() => closeMiniCart()}>View cart</a>
				<a
					href="/checkout"
					class="btn btn-style2 checkout {totalItems === 0 ? 'disabled' : ''}"
					on:click={() => {
						if (totalItems > 0) closeMiniCart();
					}}
				>
					Checkout
				</a>
			</div>
		</li>
	</ul>
</div>
<!-- mini-cart end -->
