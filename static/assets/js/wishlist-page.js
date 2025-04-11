console.log("✅ wishlist-page.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  const wishlistCounterElements = document.querySelectorAll(".wishlist-counter");
  const wishlistContainer = document.querySelector(".wishlist-tile-container");
  const clearWishlistButton = document.querySelector(".clear-wishlist");
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to update wishlist count
  function updateWishlistCount() {
    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const count = wishlist.length;
    wishlistCounterElements.forEach((counter) => (counter.textContent = count));
  }

  // Function to render wishlist items
  function renderWishlist() {
    if (!wishlistContainer) return;

    wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlistContainer.innerHTML =
      wishlist.length === 0
        ? "<p>Your wishlist is empty.</p>"
        : wishlist
            .map(
              (product) => `
        <ul class="wishlist-container">
          <li class="wishlist-info">
            <div class="item-img">
              <a href="javascript:void(0)">
                <img src="${product.image}" class="img-fluid" alt="${product.name}" />
              </a>
            </div>
            <div class="item-title">
              <a href="javascript:void(0)">${product.name}</a>
            </div>
          </li>
          <li class="item-add-remove">
            <div class="item-add">
              <a href="javascript:void(0)" class="add-to-cart" data-id="${product.id}">
                <span>
                  <span class="cart-title">Add to cart</span>
                </span>
              </a>
            </div>
          </li>
          <li class="item-price">
            <div class="price-box">
              <span class="new-price">€${product.price}</span>
              <span class="old-price">€${(product.price * 1.2).toFixed(2)}</span>
            </div>
            <span class="item-remove">
              <a href="javascript:void(0)" class="action-wishlist wishlist-btn text-danger is-active" data-id="${product.id}">
                <span class="remove-wishlist"><i class="fa fa-trash"></i></span>
              </a>
            </span>
          </li>
        </ul>
      `
            )
            .join("");

    updateWishlistCount();
  }

  // Function to add item to cart
  function addToCart(productId) {
    const product = wishlist.find((item) => item.id === productId);
    if (!product) {
      alert("Product not found in wishlist.");
      return;
    }

    const existingCartItem = cart.find((item) => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  }

  // Function to remove an item from the wishlist
  function removeFromWishlist(productId) {
    wishlist = wishlist.filter((item) => item.id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishlist();
  }

  // Function to clear wishlist
  function clearWishlist() {
    if (confirm("Are you sure you want to clear your wishlist?")) {
      localStorage.removeItem("wishlist");
      wishlist = [];
      renderWishlist();
    }
  }

  // Attach event listeners using event delegation
  if (wishlistContainer) {
    wishlistContainer.addEventListener("click", function (event) {
      const target = event.target.closest(".remove-wishlist, .add-to-cart");
      if (!target) return;

      const productId = target.closest("a").dataset.id;

      if (target.classList.contains("remove-wishlist")) {
        removeFromWishlist(productId);
      } else if (target.classList.contains("add-to-cart")) {
        addToCart(productId);
      }
    });
  }

  // Attach clear wishlist functionality
  if (clearWishlistButton) {
    clearWishlistButton.addEventListener("click", clearWishlist);
  }

  // **Fix: Detect localStorage changes to re-render wishlist when navigating**
  window.addEventListener("storage", function (event) {
    if (event.key === "wishlist") {
      renderWishlist();
    }
  });

  // **Fix: Re-render on page show (when returning to the wishlist page)**
  window.addEventListener("pageshow", renderWishlist);

  // Initial rendering and count update
  renderWishlist();
});

console.log("✅ Defining renderWishlist");

window.renderWishlist = renderWishlist;
