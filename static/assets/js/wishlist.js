document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-product");
    if (!btn) return;

    e.preventDefault();

    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = btn.dataset.price;
    const image = btn.dataset.image;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.some((item) => item.id === id);

    if (exists) {
      alert("Item already in wishlist!");
    } else {
      wishlist.push({ id, name, price, image });
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Added to wishlist!");

      // ✅ Update counter if present
      const counter = document.querySelectorAll(".wishlist-counter");
      if (counter) {
        counter.forEach((el) => {
          el.textContent = wishlist.length;
        });
      }

      // ✅ LIVE UPDATE if renderWishlist exists (from wishlist-page.js)
      if (typeof renderWishlist === "function") {
        renderWishlist();
      }
    }
  });
});
window.dispatchWishlistUpdate = function () {
  window.dispatchEvent(new StorageEvent("storage", {
    key: "wishlist",
    newValue: localStorage.getItem("wishlist")
  }));
};
