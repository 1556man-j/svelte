<script>
  import { onMount } from 'svelte';

  let checkoutData = {};
  let orderDetails = {};
  let cartItems = [];

  onMount(() => {
    // Retrieve data from localStorage
    checkoutData = JSON.parse(localStorage.getItem('checkoutFormData')) || {};
    orderDetails = JSON.parse(localStorage.getItem('orderDetails')) || {};
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Generate random order number and transaction number if not present
    if (!orderDetails.orderNumber) {
      orderDetails.orderNumber = generateRandomNumber();
    }
    if (!orderDetails.transactionNumber) {
      orderDetails.transactionNumber = generateRandomNumber();
    }

    // Set current date and time for order date
    if (!orderDetails.orderDate) {
      orderDetails.orderDate = new Date().toLocaleString();
    }

    // Calculate total price
    orderDetails.totalPrice = calculateTotalPrice(cartItems);

   // Store updated orderDetails back to localStorage
   localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
  });

  // Function to generate a random number
 function generateRandomNumber() {
    return Math.floor(100000000000 + Math.random() * 900000000000);
  }

  // Function to calculate total price from cart items
  function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }
</script>

<main>
  <!-- breadcrumb start -->
  <section class="breadcrumb-area">
    <div class="container">
      <div class="col">
        <div class="row">
          <div class="breadcrumb-index">
            <div class="breadcrumb-title">
              <h2>Order Complete</h2>
            </div>
            <ul class="breadcrumb-list">
              <li class="breadcrumb-item-link">
                <a href="/">Home</a>
              </li>
              <li class="breadcrumb-item-link">
                <span>Order Complete</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- breadcrumb end -->

  <!-- order-complete start -->
  <section class="section-ptb">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="order-area">
            <!-- order-price start -->
            <div class="order-price">
              <ul class="total-order order-details">
                <li>
                  <span class="order-no">Order No: <span>{orderDetails.orderNumber}</span></span>
                </li>
                <li>
                  <span class="order-date">Order Date: <span>{orderDetails.orderDate}</span></span>
                </li>
                <li>
                  <span class="total-price">Order Total: <span>€{orderDetails.totalPrice}</span></span>
                </li>
              </ul>
            </div>
            <!-- order-price end -->

            <!-- order-details start -->
            <div class="order-details">
              <span class="text-success order-i">
                <i class="fa fa-check-circle"></i>
              </span>
              <h4>Thank you for your order</h4>
              <span class="order-s">Your order will ship within a few hours</span>
              <a href="/track" class="tracking-link btn btn-style">Tracking Details</a>
            </div>
            <!-- order-details end -->

            <!-- order-delivery start -->
            <div class="order-delivery">
              <ul class="delivery-payment">
                <li class="delivery">
                  <h5>Delivery Address</h5>
                  <p>{checkoutData.firstName} {checkoutData.lastName}</p>
                  <span class="order-span">{checkoutData.address1}</span>
                  {#if checkoutData.address2}
                    <span class="order-span">{checkoutData.address2}</span>
                  {/if}
                  <span class="order-span">{checkoutData.state}</span>
                  <span class="order-span">{checkoutData.country}</span>
                  <span class="order-span">Mobile No: {checkoutData.phoneNumber}</span>
                  <span class="order-span">Email: {checkoutData.email}</span>
                </li>
                <li class="pay">
                  <h5>Payment Summary</h5>
                  <p class="transition">Transaction No: {orderDetails.transactionNumber}</p>
                  <span class="order-span p-label">
                    <span class="n-price">Price</span>
                    <span class="o-price">€{orderDetails.totalPrice}</span>
                  </span>
                  <span class="order-span p-label">
                    <span class="n-price">Shipping Charge</span>
                    <span class="o-price">€8.00</span>
                  </span>
                  <span class="order-span p-label">
                    <span class="n-price">Order Total</span>
                    <span class="o-price">€{(parseFloat(orderDetails.totalPrice) + 8).toFixed(2)}</span>
                  </span>
                </li>
              </ul>
            </div>
            <!-- order-delivery end -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- order-complete end -->
</main>
