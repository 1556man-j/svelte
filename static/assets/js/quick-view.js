// quickview.js
document.querySelectorAll('.quick-view').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const el = e.currentTarget;
    const product = {
      id: el.getAttribute('data-id'),
      name: el.getAttribute('data-name'),
      price: el.getAttribute('data-price'),
      image: el.getAttribute('data-image')
    };

    // Update modal content
    document.querySelector('.modal-title').textContent = product.name;
    document.querySelector('.modal-price').textContent = `$${product.price}`;
    document.querySelector('.modal-image').src = product.image;

    // Store product data for Svelte
    window.currentProduct = product;
  });
});
