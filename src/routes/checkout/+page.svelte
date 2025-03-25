<script>

</script>

<main>
    <!-- breadcrumb start -->
    <section class="breadcrumb-area">
      <div class="container">
        <div class="col">
          <div class="row">
            <div class="breadcrumb-index">
              <!-- breadcrumb main-title start-->
              <div class="breadcrumb-title">
                <h2>Checkout</h2>
              </div>
              <!-- breadcrumb main-title end-->
              <!-- breadcrumb-list start -->
              <ul class="breadcrumb-list">
                <li class="breadcrumb-item-link">
                  <a href="/">Home</a>
                </li>
                <li class="breadcrumb-item-link">
                  <span>Checkout</span>
                </li>
              </ul>
              <!-- breadcrumb-list end -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- main section start-->
    <section class="section-ptb check-3">
      <div class="container">
        <div class="row">
          <div class="col">
            <h2 class="style-3-title">Secure checkout</h2>
            <div class="check-3-start">
              <div class="check-out-3">
                <div class="check-pro">
                  <h2>1. In your cart</h2>
                  <div class="item-wrap">
                    <ul class="cart-wrap-ul cart-item" >
                      
                    </ul>
                    
                  </div>
                  <form>
                    <ul class="style-3-check-pro">
                      <li>
                        <label>Shipping to:</label>
                        <select id="country-select">
                          <option selected>Nigeria</option>
                          <!-- Country options will be populated dynamically -->
                        </select>
                      </li>
                    </ul>
                    <ul class="style-3-check-pro selector pro-submit">
                      <li><span>Select delivery</span></li>
                      <li class="label-info">
                        <label class="box-area">
                          <span class="text">Regular</span>
                          <input type="checkbox" class="cust-checkbox" />
                          <span class="cust-check"></span>
                        </label>
                      </li>
                      <li class="label-info">
                        <label class="box-area">
                          <span class="text">Express</span>
                          <input type="checkbox" class="cust-checkbox" />
                          <span class="cust-check"></span>
                        </label>
                      </li>
                    </ul>
                  </form>
                  <div class="pay-op">
                    <span>For quick payment</span>
                    <a href="javascript:void(0)" class="pay-link pay-link-1">
                      Check out with :
                      <i class="fa-brands fa-paypal"></i>
                    </a>
                    <a href="javascript:void(0)" class="pay-link pay-link-2">
                      Check out with :
                      <i class="fa-brands fa-google"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div class="check-out-3">
                <div class="check-add">
                  <h2>2. Delivery Address</h2>
                  <form>
                    <ul>
                      <li>
                        <label>First name</label>
                        <input
                          type="text"
                          name="f-name"
                          placeholder="First name"
                        />
                      </li>
                      <li>
                        <label>Last name</label>
                        <input
                          type="text"
                          name="l-name"
                          placeholder="Last name"
                        />
                      </li>
                      <li>
                        <label>Email address</label>
                        <input
                          type="text"
                          name="mail"
                          placeholder="Enter your mail"
                        />
                      </li>
                      <li>
                        <label>Mobile number</label>
                        <input
                          type="text"
                          name="number"
                          placeholder="Enter your number"
                        />
                      </li>
                      <li>
                        <label>Delivery address</label>
                        <input
                          type="text"
                          name="add"
                          placeholder="Enter your address1"
                        />
                        <input
                          type="text"
                          name="add-2"
                          placeholder="Enter your address2"
                        />
                      </li>
                      <li>
                        <label>Postcode / zip code</label>
                        <input type="text" name="--" placeholder="zip code" />
                      </li>
                      <li>
                        <label for="state-select">Select State</label>
<select id="state-select" disabled>
<option value="">Select State</option>
</select>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
              <div class="check-out-3">
                <div class="pay-method">
                  <!-- p-method title start -->
                  <h2>3. Select payment method</h2>
                  <!-- p-method title end -->
                  <!-- p-method start -->
                  <div class="p-method">
                    <ul>
                      <li>
                        <a href="javascript:void(0)">
                          <span class="p-labal">
                            <i class="fa-solid fa-credit-card"></i>
                            <span>Card</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <span class="p-labal">
                            <i class="fa-brands fa-paypal"></i>
                            <span>PayPal</span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <span class="p-labal">
                            <i class="fa-brands fa-cc-mastercard"></i>
                            <span>Mastercard</span>
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <!-- p-method end -->
                  <!-- order-summary start -->
                  <div class="order-summary">
                    <h2>Order Summary</h2>
                    <ul id="order-summary-list">
                      <!-- Items will be dynamically injected here -->
                    </ul>
                    <div class="check-btn">
                      <a href="/order" class="btn-style">Complete Order</a>
                    </div>
                  </div>
                  <!-- order-summary end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <!-- main section end-->
