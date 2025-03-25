<script>
	import { onMount } from "svelte";
	let showRecoverForm = false;
  
	function toggleForm() {
	  showRecoverForm = !showRecoverForm;
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
				<h2>Account</h2>
			  </div>
			  <ul class="breadcrumb-list">
				<li class="breadcrumb-item-list">
				  <a href="/">Home</a>
				</li>
				<li class="breadcrumb-item-list">
				  <span>Account</span>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  </div>
	</section>
	<!-- breadcrumb end -->
  
	<section class="customer-page section-ptb">
	  <div class="container">
		<div class="row">
		  <div class="col">
			<div class="acc-form">
			  {#if !showRecoverForm}
				<div class="log-acc-page">
				  <div class="content-main-title">
					<div class="section-cont-title">
					  <h2><span>Login account</span></h2>
					  <p>Please enter your account details.</p>
					</div>
				  </div>
				  <div class="acc-page">
					<div class="login">
					  <form method="post">
						<div class="login-form-container">
						  <ul class="fill-form">
							<li class="log-email">
							  <label>Email address</label>
							  <input
								type="email"
								name="email"
								class="input-full"
								placeholder="Email address"
								autocomplete="off"
							  />
							</li>
							<li class="log-pwd">
							  <label>Password</label>
							  <input
								type="password"
								name="password"
								class="input-full"
								placeholder="Password"
							  />
							</li>
						  </ul>
						  <div class="form-action-button">
							<button type="submit" class="btn btn-style2">Sign In</button>
							<a href="#" on:click|preventDefault={toggleForm} role="button">Forgot your password?</a>
						  </div>
						</div>
					  </form>
					</div>
					<div class="acc-wrapper">
					  <h6>Don't have an account?</h6>
					  <div class="account-optional-action">
						<a href="/create-account">Create account</a>
					  </div>
					</div>
				  </div>
				</div>
			  {:else}
				<div class="log-acc-page">
				  <div class="content-main-title">
					<div class="section-cont-title">
					  <h2>
						<span class="title-main">Reset your password</span>
					  </h2>
					  <p>We will send you an email to reset your password.</p>
					</div>
				  </div>
				  <div class="acc-page">
					<div class="login">
					  <form method="post">
						<div class="login-form-container">
						  <ul class="fill-form">
							<li class="log-email">
							  <label>Email address</label>
							  <input
								type="email"
								name="email"
								class="input-full"
								placeholder="Email address"
								autocomplete="off"
							  />
							</li>
							<li class="form-toggle-btn">
							  <div class="form-action-button">
								<button type="submit" class="btn btn-style2">Submit</button>
								<a href="#" on:click|preventDefault={toggleForm} role="button">Cancel</a>
							  </div>
							</li>
						  </ul>
						</div>
					  </form>
					</div>
				  </div>
				</div>
			  {/if}
			</div>
		  </div>
		</div>
	  </div>
	</section>
  </main>
  