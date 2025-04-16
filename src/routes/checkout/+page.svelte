<script>
	let cart = [];
	let shippingCost = 0;
	let selectedCountry = 'Nigeria';
	let selectedState = '';
	let selectedShippingMethod = '';
	// Load cart from localStorage
	function loadCart() {
		const storedCart = localStorage.getItem('cart');
		cart = storedCart ? JSON.parse(storedCart) : [];

		selectedCountry = localStorage.getItem('selectedCountry') || 'Nigeria';
		selectedState = localStorage.getItem('selectedState') || '';
		selectedShippingMethod = localStorage.getItem('selectedShippingMethod') || '';
	}

	// Save cart to localStorage
	function saveCart() {
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('selectedCountry', selectedCountry);
		localStorage.setItem('selectedState', selectedState);
		localStorage.setItem('selectedShippingMethod', selectedShippingMethod);
		window.dispatchEvent(new CustomEvent('cartUpdated'));
	}

	// Populate country and state dropdowns
	function populateCountryState() {
		const countrySelect = document.getElementById('country-select');
		const stateSelect = document.getElementById('state-select');

		// Clear existing options
		countrySelect.innerHTML = '';
		stateSelect.innerHTML = '';

		// Populate countries
		for (let i = 0; i < country_arr.length; i++) {
			const option = document.createElement('option');
			option.value = country_arr[i];
			option.text = country_arr[i];
			countrySelect.appendChild(option);
		}

		// Set selected country
		countrySelect.value = selectedCountry;

		// Populate states for selected country
		populateStates(selectedCountry);

		// Set selected state
		stateSelect.value = selectedState;

		// Enable state select
		stateSelect.disabled = false;

		// Event listeners
		countrySelect.addEventListener('change', function () {
			selectedCountry = this.value;
			populateStates(selectedCountry);
			selectedState = '';
			stateSelect.value = '';
			saveCart();
			updateOrderSummary();
		});

		stateSelect.addEventListener('change', function () {
			selectedState = this.value;
			saveCart();
		});
	}

	function populateStates(country) {
		const stateSelect = document.getElementById('state-select');
		stateSelect.innerHTML = '';

		const states = s_a[country_arr.indexOf(country)].split('|');
		for (let i = 0; i < states.length; i++) {
			const option = document.createElement('option');
			option.value = states[i];
			option.text = states[i];
			stateSelect.appendChild(option);
		}
	}

	// Update order summary
	function updateOrderSummary() {
		const orderSummaryList = document.getElementById('order-summary-list');
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

		// Determine shipping cost
		shippingCost =
			selectedShippingMethod === 'Express' ? 20 : selectedShippingMethod === 'Regular' ? 10 : 0;

		const total = subtotal + shippingCost;

		// Clear existing summary
		orderSummaryList.innerHTML = '';
		// Add cart items
		cart.forEach((item) => {
			const li = document.createElement('li');
			li.innerHTML = `
			<span class="p-name">${item.name} (x${item.quantity}):</span>
      <span class="p-price">$${(item.price * item.quantity).toFixed(2)}</span>
			`;
			orderSummaryList.appendChild(li);
		});

		// Add subtotal
		const subtotalLi = document.createElement('li');
		subtotalLi.innerHTML = `
		<span class="p-name">Subtotal:</span>
    <span class="p-price">$${subtotal.toFixed(2)}</span>
		`;
		orderSummaryList.appendChild(subtotalLi);

		// Add shipping
		const shippingLi = document.createElement('li');
		shippingLi.innerHTML = `
		<span class="p-name">Shipping to ${selectedCountry}:</span>
    <span class="p-price">$${shippingCost.toFixed(2)}</span>
		  `;
		orderSummaryList.appendChild(shippingLi);

		// Add total
		const totalLi = document.createElement('li');
		totalLi.innerHTML = `
		<span class="p-name">Order Total:</span>
    <span class="p-price">$${total.toFixed(2)}</span>
		`;
		orderSummaryList.appendChild(totalLi);
	}
	// Event listeners for shipping method
	function setupShippingMethodListeners() {
		const shippingOptions = document.querySelectorAll('.cust-checkbox');
		shippingOptions.forEach((option) => {
			option.addEventListener('change', function () {
				if (this.checked) {
					selectedShippingMethod = this.parentElement.querySelector('.text').textContent;
					// Uncheck other options
					shippingOptions.forEach((opt) => {
						if (opt !== this) opt.checked = false;
					});
					saveCart();
					updateOrderSummary();
				}
			});
		});
	}

	// Update cart display
	function updateCartDisplay() {
		const cartList = document.querySelector('.cart-wrap-ul.cart-item');
		const subtotalPriceElement = document.querySelector('.subtotal-price');
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
        <span class="item-price">€${item.price.toFixed(2)}</span>
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

	import { onMount } from 'svelte';

	onMount(() => {
		loadCart();
		updateCartDisplay();
		populateCountryState();
		updateOrderSummary();
		setupShippingMethodListeners();

		// Listen for custom 'cartUpdated' events
		window.addEventListener('cartUpdated', () => {
			loadCart();
			updateCartDisplay();
			updateOrderSummary();
		});

		// Listen for 'storage' events to handle changes from other tabs/windows
		window.addEventListener('storage', (event) => {
			if (event.key === 'cart') {
				loadCart();
				updateCartDisplay();
				updateOrderSummary();
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
	});

	let firstName = '';
	let lastName = '';
	let email = '';
	let phoneNumber = '';
	let address1 = '';
	let address2 = '';
	let zipCode = '';
	let state = '';
	let country = '';

	// Reactive statements to track the validity of each field
	$: firstNameValid = firstName.trim() !== '';
	$: lastNameValid = lastName.trim() !== '';
	$: emailValid = /\S+@\S+\.\S+/.test(email);
	$: phoneNumberValid = /^\+?\d{1,4}?[-.\s]?\(?\d+\)?[-.\s]?\d+[-.\s]?\d+$/.test(phoneNumber);
	$: address1Valid = address1.trim() !== '';
	$: zipCodeValid = /^\d{5}$/.test(zipCode);
	$: stateValid = state.trim() !== '';
	$: countryValid = country.trim() !== '';

	// Function to validate the form
	function validateForm() {
		return (
			firstNameValid &&
			lastNameValid &&
			emailValid &&
			phoneNumberValid &&
			address1Valid &&
			zipCodeValid &&
			stateValid &&
			countryValid
		);
	}

	function handleSubmit(event) {
		event.preventDefault();

		// Collect all validation statuses
		const validationStatuses = {
			firstName: firstNameValid,
			lastName: lastNameValid,
			email: emailValid,
			phoneNumber: phoneNumberValid,
			address1: address1Valid,
			zipCode: zipCodeValid,
			state: stateValid,
			country: countryValid
		};

		// Find fields that are invalid
		const invalidFields = Object.keys(validationStatuses).filter(
			(field) => !validationStatuses[field]
		);

		if (invalidFields.length > 0) {
			alert(`Please fill in the following fields: ${invalidFields.join(', ')}`);
			return;
		}

		// Proceed with form submission logic
		// For example, save data to localStorage or send it to a server
		const formData = {
			firstName,
			lastName,
			email,
			phoneNumber,
			address1,
			address2,
			zipCode,
			state,
			country
		};

		// Save form data to localStorage
		localStorage.setItem('checkoutFormData', JSON.stringify(formData));

		// Redirect to order page or show success message
		window.location.href = '/order';
	}
</script>

<main>
	<!-- breadcrumb start -->
	<section class="breadcrumb-area">
		<div class="container">
			<div class="col">
				<div class="row">
					<div class="breadcrumb-index">
						<!-- breadcrumb main-title start-->
						<div class="breadcrumb-title">
							<h2>Checkout</h2>
						</div>
						<!-- breadcrumb main-title end-->
						<!-- breadcrumb-list start -->
						<ul class="breadcrumb-list">
							<li class="breadcrumb-item-link">
								<a href="/">Home</a>
							</li>
							<li class="breadcrumb-item-link">
								<span>Checkout</span>
							</li>
						</ul>
						<!-- breadcrumb-list end -->
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- main section start-->
	<section class="section-ptb check-3">
		<div class="container">
			<div class="row">
				<div class="col">
					<h2 class="style-3-title">Secure checkout</h2>
					<div class="check-3-start">
						<div class="check-out-3">
							<div class="check-pro">
								<h2>1. In your cart</h2>
								<div class="item-wrap">
									<ul class="cart-wrap-ul cart-item"></ul>
								</div>
								<form>
									<ul class="style-3-check-pro">
										<li>
											<label>Shipping to:</label>
											<select
												bind:value={country}
												id="country-select"
												class:invalid={!countryValid}
												required
											>
												<option selected>Nigeria</option>
												<!-- Country options will be populated dynamically -->
											</select>
										</li>
									</ul>
									<ul class="style-3-check-pro selector pro-submit">
										<li><span>Select delivery</span></li>
										<li class="label-info">
											<label class="box-area">
												<span class="text">Regular</span>
												<input type="checkbox" class="cust-checkbox" />
												<span class="cust-check"></span>
											</label>
										</li>
										<li class="label-info">
											<label class="box-area">
												<span class="text">Express</span>
												<input type="checkbox" class="cust-checkbox" />
												<span class="cust-check"></span>
											</label>
										</li>
									</ul>
								</form>
								<div class="pay-op">
									<span>For quick payment</span>
									<a href="javascript:void(0)" class="pay-link pay-link-1">
										Check out with :
										<i class="fa-brands fa-paypal"></i>
									</a>
									<a href="javascript:void(0)" class="pay-link pay-link-2">
										Check out with :
										<i class="fa-brands fa-google"></i>
									</a>
								</div>
							</div>
						</div>
						<div class="check-out-3">
							<div class="check-add">
								<h2>2. Delivery Address</h2>
								<form>
									<ul>
										<li>
											<label>First name</label>
											<input
												type="text"
												bind:value={firstName}
												name="f-name"
												placeholder="First name"
												class:invalid={!firstNameValid}
												required
											/>
										</li>
										<li>
											<label>Last name</label>
											<input
												type="text"
												bind:value={lastName}
												name="l-name"
												placeholder="Last name"
												class:invalid={!lastNameValid}
												required
											/>
										</li>
										<li>
											<label>Email address</label>
											<input
												type="text"
												bind:value={email}
												name="mail"
												placeholder="Enter your mail"
												class:invalid={!emailValid}
												required
											/>
										</li>
										<li>
											<label>Mobile number</label>
											<input
												type="text"
												bind:value={phoneNumber}
												name="number"
												placeholder="Enter your number"
												class:invalid={!phoneNumberValid}
												required
											/>
										</li>
										<li>
											<label>Delivery address</label>
											<input
												type="text"
												bind:value={address1}
												name="add"
												placeholder="Enter your address1"
												class:invalid={!address1Valid}
												required
											/>
											<input
												type="text"
												bind:value={address2}
												name="add-2"
												placeholder="Enter your address2"
												required
											/>
										</li>
										<li>
											<label>Postcode / zip code</label>
											<input
												type="text" bind:value={zipCode}
												name="--"
												placeholder="zip code"
												class:invalid={!zipCodeValid}
												required
											/>
										</li>
										<li>
											<label for="state-select">Select State</label>
											<select
												bind:value={state}
												id="state-select"
												class:invalid={!stateValid}
												required
											>
												<option value="">Select State</option>
											</select>
										</li>
									</ul>
								</form>
							</div>
						</div>
						<div class="check-out-3">
							<div class="pay-method">
								<!-- p-method title start -->
								<h2>3. Select payment method</h2>
								<!-- p-method title end -->
								<!-- p-method start -->
								<div class="p-method">
									<ul>
										<li>
											<a href="javascript:void(0)">
												<span class="p-labal">
													<i class="fa-solid fa-credit-card"></i>
													<span>Card</span>
												</span>
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												<span class="p-labal">
													<i class="fa-brands fa-paypal"></i>
													<span>PayPal</span>
												</span>
											</a>
										</li>
										<li>
											<a href="javascript:void(0)">
												<span class="p-labal">
													<i class="fa-brands fa-cc-mastercard"></i>
													<span>Mastercard</span>
												</span>
											</a>
										</li>
									</ul>
								</div>
								<!-- p-method end -->
								<!-- order-summary start -->
								<div class="order-summary">
									<h2>Order Summary</h2>
									<ul id="order-summary-list">
										<!-- Items will be dynamically injected here -->
									</ul>
									<div class="check-btn">
										<a
											href="/order"
											id="complete-order-btn"
											class="btn-style"
											disabled={!validateForm()}
											on:click={handleSubmit}>Complete Order</a
										>
									</div>
								</div>
								<!-- order-summary end -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- main section end-->

<style>
	.invalid {
		border: 2px solid red;
	}
</style>
