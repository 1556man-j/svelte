<script>
  import { onMount } from "svelte";

  onMount(() => {
    if (!window.location.hash.includes("#reloaded")) {
      // First load — add hash and reload
      window.location.href = window.location.href + "#reloaded";
      window.location.reload();
    }


  const scripts = [
      '/static/assets/js/wishlist.js',
      '/static/assets/js/wishlist-page.js',
    ];

    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    });
    
    // Wait until the DOM is ready before running the JS
    const checkDOM = setInterval(() => {
			const container = document.querySelector(".wishlist-tile-container");

			if (container && typeof window.renderWishlist === "function") {
				console.log("Running renderWishlist from Svelte...");
				window.renderWishlist();
				clearInterval(checkDOM);
			}
		}, 100);
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
                    <span class="wishlist-counter">0</span>
                    <span class="wish-item-title">Item(s)</span>
                  </span>
                </div>

                <!-- Wishlist Products -->
                <ul class="wishlist-tile-container" id="wishlist-items">
                  <!-- JS will dynamically populate this -->
                </ul>

                <!-- Wishlist Buttons -->
                <div class="wishlist-buttons">
                  <a href="/collection" class="btn-style2">Continue shopping</a>
                  <a href="javascript:void(0)" class="btn-style2 clear-wishlist">Clear wishlist</a>
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
