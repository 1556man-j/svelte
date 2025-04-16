<script>
	import { onMount } from 'svelte';

	onMount(() => {
		loadCart();
		updateCartDisplay();

		// Listen for custom 'cartUpdated' events
		window.addEventListener('cartUpdated', () => {
			loadCart();
			updateCartDisplay();
		});

		// Listen for 'storage' events to handle changes from other tabs/windows
		window.addEventListener('storage', (event) => {
			if (event.key === 'cart') {
				loadCart();
				updateCartDisplay();
				updateCartCount();
			}
		});

		// Event delegation for quantity buttons and remove links
		document.querySelector('.cart-wrap-ul.cart-item').addEventListener('click', (event) => {
			const target = event.target;
			const id = target.getAttribute('data-id');
			if (id) {
				if (target.classList.contains('minus')) {
					adjustQuantity(id, -1);
				} else if (target.classList.contains('plus')) {
					adjustQuantity(id, 1);
				} else if (target.classList.contains('remove-item')) {
					removeItem(id);
				}
			}
		});

		// Attach event listener to the Clear Cart button
		const clearCartButton = document.getElementById('clear-cart');
		if (clearCartButton) {
			clearCartButton.addEventListener('click', clearCart);
		}

		const clearCartTotalButton = document.getElementById('clear-cart-total');
		if (clearCartTotalButton) {
			clearCartTotalButton.addEventListener('click', clearCart);
		}

		// Wait until DOM is ready before running the JS
		const checkDOM = setInterval(() => {
			const exists = document.querySelector('.product-title h2');
			if (exists && window.loadProductData) {
				clearInterval(checkDOM);
				window.loadProductData(); // Run the function from your external JS
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

		
		window.dispatchEvent(new CustomEvent('cartUpdated'));
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
		

		// Open mini-cart sidebar
		document.querySelector('.mini-cart')?.classList.add('active');
	}

	let cart = [];

	// Load cart from localStorage
	function loadCart() {
		const storedCart = localStorage.getItem('cart');
		cart = storedCart ? JSON.parse(storedCart) : [];
	}

	// Save cart to localStorage
	function saveCart() {
		localStorage.setItem('cart', JSON.stringify(cart));
		window.dispatchEvent(new CustomEvent('cartUpdated'));
	}

	// Update cart display
	function updateCartDisplay() {
		const cartList = document.querySelector('.cart-wrap-ul.cart-item');
		const subtotalPriceElement = document.querySelector('.subtotal');
		const totalPriceElement = document.querySelector('.total-price');
		const cartCounter = document.getElementById('cart-counters');

		if (cartList) {
			cartList.innerHTML = ''; // Clear existing items
			let subtotal = 0;

			cart.forEach((item) => {
				const itemTotalPrice = item.price * item.quantity;
				subtotal += itemTotalPrice;

				const li = document.createElement('li');
				li.classList.add('item-info');
				li.innerHTML = `
           <!-- cart-img start -->
      <div class="item-img">
         <a href="/product-template/${item.id}">
          <img src="${item.image}" class="img-fluid" alt="${item.name}" />
        </a>
      </div>
      <!-- cart-img end -->

      <!-- cart-title start -->
      <div class="item-title">
         <a href="/product-template/${item.id}">${item.name}</a>
        <span class="item-option">
          <span class="pro-variant-title">Quantity:</span>
          <span class="pro-variant-type">${item.quantity}</span>
        </span>
        <span class="item-option">
          <span class="item-price">€${Number(item.price).toFixed(2)}</span>
        </span>
      </div>
      <!-- cart-title end -->
        `;
				cartList.appendChild(li);

				const qtyAndRemove = document.createElement('li');
				qtyAndRemove.classList.add('item-qty');
				qtyAndRemove.innerHTML = `
      <div class="product-quantity-action">
        <div class="product-quantity">
          <div class="cart-plus-minus">
            <button type="button" class="dec qtybutton minus" data-id="${item.id}">
              <i class="feather-minus"></i>
            </button>
            <input type="text" name="quantity" value="${item.quantity}" disabled />
            <button type="button" class="inc qtybutton plus" data-id="${item.id}">
              <i class="feather-plus"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="item-remove">
        <span class="remove-wrap">
          <a href="javascript:void(0)" class="text-danger remove-item" data-id="${item.id}">Remove</a>
        </span>
      </div>
    `;
				cartList.appendChild(qtyAndRemove);

				const priceDetails = document.createElement('li');
				priceDetails.classList.add('item-price');
				priceDetails.innerHTML = `<span class="amount full-price">€${itemTotalPrice.toFixed(2)}</span>`;
				cartList.appendChild(priceDetails);
			});

			// Update subtotal
			if (subtotalPriceElement) {
				subtotalPriceElement.textContent = `€${subtotal.toFixed(2)}`;
			}

			// Update total (assuming no additional fees or taxes)
			if (totalPriceElement) {
				totalPriceElement.textContent = `€${subtotal.toFixed(2)}`;
			}

			// Update cart counter
			if (cartCounter) {
				cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
			}
		}
	}

	// Adjust item quantity
	function adjustQuantity(id, change) {
		const item = cart.find((item) => item.id === id);
		if (item) {
			item.quantity += change;
			if (item.quantity <= 0) {
				removeItem(id);
			} else {
				saveCart();
				updateCartDisplay();
			}
		}
	}

	// Remove item from cart
	function removeItem(id) {
		cart = cart.filter((item) => item.id !== id);
		saveCart();
		updateCartDisplay();
	}

	// Add item to cart
	function addToCart(newItem) {
		const existingItem = cart.find((item) => item.id === newItem.id);
		if (existingItem) {
			existingItem.quantity += newItem.quantity;
		} else {
			cart.push(newItem);
		}
		saveCart();
		updateCartDisplay();
	}

	function clearCart() {
		if (confirm('Are you sure you want to clear the cart?')) {
			localStorage.removeItem('cart');
			cart = [];
			updateCartDisplay();
			window.dispatchEvent(new CustomEvent('cartUpdated'));
		}
	}

	function handleWishlistClick(event) {
		const btn = event.currentTarget;
		const id = btn.dataset.id;
		const name = btn.dataset.name;
		const price = parseFloat(btn.dataset.price);
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
	}
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
											<button type="button" id="clear-cart" class="btn-style2 clear"
												>Clear Cart</button
											>
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
									<p>Subtotal: <span class="subtotal-price subtotal">€0.00</span></p>
									<div class="cart-buttons">
										<a href="/collection" class="btn-style2">Continue Shopping</a>
										<button type="button" id="clear-cart-total" class="btn-style2 clear"
											>Clear Cart</button
										>
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
											<span class="amount total-price">€.00</span>
										</div>
										<div class="proceed-to-discount">
											<input type="text" name="discount" placeholder="Discount code" />
										</div>
										<div class="proceed-to-checkout">
											<a href="/checkout">Checkout</a>
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
