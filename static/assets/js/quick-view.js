document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  const quickViewLinks = document.querySelectorAll(".quick-view");

  quickViewLinks.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();

      const productId = link.getAttribute("data-id");
      const productName = link.getAttribute("data-name");
      const productPrice = link.getAttribute("data-price");
      const productImage = link.getAttribute("data-image");

      console.log("Quick View Clicked:", productId, productName, productPrice, productImage);

      const modalTitle = document.querySelector(".product_title");
      const modalPrice = document.querySelector(".new-price");
      const modalImage = document.querySelector(".quickview-slider img");

      if (modalTitle && modalPrice && modalImage) {
        modalTitle.textContent = productName;
        modalPrice.textContent = `$${productPrice}`;
        modalImage.src = productImage;
        modalImage.alt = productName;
      } else {
        console.error("Modal elements not found!");
        return;
      }

      const quickViewModal = new bootstrap.Modal(document.getElementById("quickview"));
      quickViewModal.show();

      const addToCartButton = document.querySelector(".addtocartqv");
      addToCartButton.replaceWith(addToCartButton.cloneNode(true));
      const newAddToCartButton = document.querySelector(".addtocartqv");

      newAddToCartButton.addEventListener("click", e => {
        e.preventDefault();

        const product = {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        };

        const existingProductIndex = cart.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += 1;
        } else {
          cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        alert("Product added to cart!");
      });

      // ✅ Ensure the backdrop is removed when closing the modal
      const modalElement = document.getElementById("quickview");
      modalElement.addEventListener("hidden.bs.modal", () => {
        document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
          backdrop.remove();
        });
        document.body.style.overflow = ""; // Restore scrolling
        document.body.classList.remove("modal-open"); // Remove Bootstrap's class
      });
    });
  });

  updateCartUI();
});
