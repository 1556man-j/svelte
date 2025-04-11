<script>
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import Minicart from '../components/Minicart.svelte';
	import Mobile from '../components/Mobile.svelte';
	import Notification from '../components/Notification.svelte';
	import Preloader from '../components/Preloader.svelte';
	import Quickview from '../components/Quickview.svelte';
	import Screenbg from '../components/Screenbg.svelte';
	import Search from '../components/Search.svelte';
	import Totop from '../components/Totop.svelte';
</script>


<Minicart/>
<Search/>
<Quickview/>

<Preloader/>
<Header />
<main>
    <slot />  <!-- This is where the page content (Home, About, etc.) will be inserted -->
</main>
<Footer/>
<Screenbg/>
<Mobile/>
<Totop/>
<Notification/>


