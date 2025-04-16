<script>
	import { onMount } from 'svelte';
	export let modalProduct;
  
	let cart = [];
	function loadCart() {
		const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
    console.log('Loaded Cart:', cart);
	}

	function addToCart() {
		
		if (!modalProduct){
			console.error('No product available to add');
			return;
		} 
		loadCart();

		if (!cart) {
      console.error('Cart is not initialized.');
      return;
    }

		const existing = cart.find((item) => item.id === modalProduct.id);
		if (existing) {
			existing.quantity += 1;
		} else {
			cart.push({ ...modalProduct, quantity: 1 });
		}
		localStorage.setItem('cart', JSON.stringify(cart));


		window.dispatchEvent(
			new CustomEvent('cartUpdated', {
				detail: { cart }
			})
		);
		
		closeQuickView();
	}
	
	function closeQuickView() {
		const modalEl = document.getElementById('quickview');
		const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
		modal.hide();
	}

	onMount(() => {
		loadCart();

		window.addEventListener('cartUpdated', (e) => {
      cart = e.detail.cart;
      console.log('Cart Updated:', cart); // Debugging cart updates
    });
	});
</script>

<!-- Product Modal -->
<div class="productmodal">
	<div
		class="modal fade"
		id="quickview"
		tabindex="-1"
		aria-labelledby="quickviewLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h6 class="modal-quickview">Quickview</h6>
					<button type="button" class="close" on:click={closeQuickView}>
						<i class="feather-x"></i>
					</button>
				</div>
				<div class="modal-body">
					<div class="quickview-main-area">
						<div class="quickview-slider">
							<div class="swiper gallery-top">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<a href="#">
											<img src={modalProduct?.image} class="img-fluid modal-image" alt={modalProduct?.name} />
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="quick-view-content">
							<div class="product-rating">
								<span class="star-rating">
									<i class="far fa-star"></i>
									<i class="far fa-star"></i>
									<i class="far fa-star"></i>
									<i class="far fa-star"></i>
									<i class="far fa-star"></i>
								</span>
							</div>
							<div class="product-title">
								<h6 class="product_title modal-title">{modalProduct?.name}</h6>
							</div>
							<div class="price-box">
								<span class="new-price modal-price">{modalProduct?.price}</span>
							</div>
							<div class="product-desc">
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
								</p>
							</div>
							<div class="quickview-buttons">
								<button type="button" class="addtocartqv" on:click={addToCart}>
									<span class="cart-title add-to-cart">Add to cart</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
