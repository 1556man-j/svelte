document.addEventListener("DOMContentLoaded", function () {
    const wishlistButtons = document.querySelectorAll(".wishlist-product");

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default link behavior

            // Get product data from the button attributes
            const product = {
                id: this.dataset.id,
                name: this.dataset.name,
                price: this.dataset.price,
                image: this.dataset.image,
            };
            console.log("Adding to wishlist:", product);

            // Retrieve current wishlist from localStorage or create a new one
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

            // Check if the product is already in the wishlist
            const exists = wishlist.some((item) => item.id === product.id);
            if (!exists) {
                wishlist.push(product); // Add new product to wishlist
                localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save updated wishlist
                
                alert("Product added to wishlist!"); // Show success message
            } else {
                alert("Product is already in the wishlist.");
            }
            updateWishlistCount();

            // No page reload needed now
        });
    });
});
