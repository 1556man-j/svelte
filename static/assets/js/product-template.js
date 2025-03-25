document.addEventListener("DOMContentLoaded", function () {
  function getProductId() {
    return window.location.pathname.split("/").pop();
  }

  fetch("/json/product-data.json")
    .then((response) => response.json())
    .then((products) => {
      const productId = getProductId();
      const product = products.find((p) => p.id === productId);

      if (product) {
        document.querySelector(".breadcrumb-title h2").innerText = product.name;
        document.querySelector(".breadcrumb-item-link span").innerText = product.name;
        document.querySelector(".product-title h2").innerText = product.name;
        document.querySelector(".true-price").innerText = product.price;
        document.querySelector(".product-imag").src = product.image;
        document.querySelector(".product-single.img-link").href = product.image;
      } else {
        console.error("Product not found");
      }
    })
    .catch((error) => console.error("Error fetching product data:", error));
});
