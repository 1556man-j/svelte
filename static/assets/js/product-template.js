function getProductId() {
  return window.location.pathname.split("/").pop();
}

function loadProductData() {
  fetch("/assets/json/product-data.json")
    .then((response) => response.json())
    .then((products) => {
      const productId = getProductId();
      const product = products.find((p) => p.id === productId);

      if (product) {
        const title = document.querySelector(".product-title h2");
        if (!title) return; // Don't continue if DOM isn't ready

        document.querySelector(".breadcrumb-title h2").innerText = product.name;
        document.querySelector(".breadcrumb-item-link span").innerText = product.name;
        title.innerText = product.name;
        document.querySelector(".true-price").innerText = product.price;
        document.querySelector(".product-imag").src = product.image;
        document.querySelector(".product-single.img-link").href = product.image;
      } else {
        console.error("Product not found");
      }
    })
    .catch((error) => console.error("Error fetching product data:", error));
}

// Export the function so Svelte can trigger it
window.loadProductData = loadProductData;
