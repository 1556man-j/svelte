document.addEventListener("DOMContentLoaded", function () {
  // Initialize product data
  let productData = [];

  // Load JSON data
  fetch('/assets/json/product-data.json')
    .then((response) => response.json())
    .then((data) => {
      productData = data;
      console.log("Product data loaded:", productData);
    })
    .catch((error) => console.error('Error loading JSON:', error));

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchButton = document.getElementById('searchButton');
  const secondarySearchInput = document.querySelector('.side-wrap .input-text');
  const secondarySearchButton = document.querySelector('.side-wrap .search-btn');

  let secondarySearchResults = document.querySelector('.side-wrap .search-results');
  if (!secondarySearchResults) {
    secondarySearchResults = document.createElement('div');
    secondarySearchResults.classList.add('search-results');
    document.querySelector('.side-wrap .crap-search').appendChild(secondarySearchResults);
  }

  // Function to hide search results
  function hideSearchResults() {
    searchResults.style.display = 'none';
    secondarySearchResults.style.display = 'none';
  }

  // Function to perform search
  function performSearch(query, resultsContainer) {
    resultsContainer.innerHTML = ''; // Clear previous results

    if (query.trim() === '') {
      resultsContainer.style.display = 'none';
      return;
    }

    const matches = productData.filter((product) =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      resultsContainer.style.display = 'block';
      matches.forEach((product) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
          <a href="/product-template/${product.id}" class="product-link">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <img src="${product.image}" style="width: 70px; height: 70px; margin-right: 10px;" alt="${product.name}">
              <div>
                <h4 style="margin: 0;">${product.name}</h4>
                <p style="margin: 0;">${product.description}</p>
                <p style="margin: 0;"><strong>Price:</strong> ${product.price}</p>
              </div>
            </div>
          </a>
        `;
        resultsContainer.appendChild(resultItem);
      });

      // Add event listener to each product link to close modal on click
      document.querySelectorAll('.product-link').forEach(link => {
        link.addEventListener('click', () => {
          hideSearchResults();
        });
      });
    } else {
      resultsContainer.style.display = 'block';
      resultsContainer.innerHTML = '<p>No results found</p>';
    }
  }

  // Close search results when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !searchInput.contains(event.target) && 
      !searchResults.contains(event.target) && 
      !secondarySearchInput.contains(event.target) && 
      !secondarySearchResults.contains(event.target) &&
      !searchButton.contains(event.target) &&
      !secondarySearchButton.contains(event.target)
    ) {
      hideSearchResults();
    }
  });

  if (searchButton && searchInput && searchResults) {
    searchButton.addEventListener('click', () => performSearch(searchInput.value.toLowerCase(), searchResults));
    searchInput.addEventListener('input', () => performSearch(searchInput.value.toLowerCase(), searchResults));
    document.getElementById('searchForm').addEventListener('submit', (e) => {
      e.preventDefault();
      performSearch(searchInput.value.toLowerCase(), searchResults);
    });
  }

  if (secondarySearchButton && secondarySearchInput && secondarySearchResults) {
    secondarySearchButton.addEventListener('click', () => performSearch(secondarySearchInput.value.toLowerCase(), secondarySearchResults));
    secondarySearchInput.addEventListener('input', () => performSearch(secondarySearchInput.value.toLowerCase(), secondarySearchResults));
  }
});
