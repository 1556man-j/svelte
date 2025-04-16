<script>
  import { onMount } from 'svelte';

  let orderNumber = 'Loading...';

  onMount(() => {
    const storedOrderDetails = localStorage.getItem('orderDetails');
    if (storedOrderDetails) {
      try {
        const orderDetails = JSON.parse(storedOrderDetails);
        if (orderDetails.orderNumber) {
          orderNumber = orderDetails.orderNumber;
        }
      } catch (error) {
        console.error('Error parsing orderDetails from localStorage:', error);
      }
    }
  });
</script>

<!-- main section start-->
<main>
  <!-- breadcrumb start -->
  <section class="breadcrumb-area">
    <div class="container">
      <div class="col">
        <div class="row">
          <div class="breadcrumb-index">
            <div class="breadcrumb-title">
              <h2>Tracking</h2>
            </div>
            <ul class="breadcrumb-list">
              <li class="breadcrumb-item-link"><a href="/">Home</a></li>
              <li class="breadcrumb-item-link"><span>Tracking</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- breadcrumb end -->

  <!-- tracking start -->
  <section class="section-ptb">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="track-area">
            <div class="track-price">
              <ul class="track-order">
                <li>
                  <h4>Your order id No: {orderNumber}</h4>
                </li>
                <li><span class="track-status">Status:</span> Picked by courier</li>
              </ul>
            </div>
            <div class="track-main">
              <div class="track">
                <div class="step active">
                  <span class="icon"><i class="fa fa-check"></i></span>
                  <span class="text">Order confirmed</span>
                </div>
                <div class="step active">
                  <span class="icon"><i class="fa fa-user"></i></span>
                  <span class="text">Picked by courier</span>
                </div>
                <div class="step">
                  <span class="icon"><i class="fa fa-truck"></i></span>
                  <span class="text">On the way</span>
                </div>
                <div class="step">
                  <span class="icon"><i class="fa fa-archive"></i></span>
                  <span class="text">Ready for pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- tracking end -->
</main>
<!-- main section end-->
