<script>
	import { page } from '$app/stores';
	import Header from "./Header.svelte";
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	$: activeUrl = $page.url.pathname;
</script>

<svelte:head>
	<title>VisualLinkX</title>
	<meta name="description" content="VisualLinkX the high end video conferencing app" />
</svelte:head>

<div class="background flex bg-palette1-0">
	<Header></Header>
	<div class="container flex">
		<div class=" w-full h-full">
		</div>
		<div class=" w-full h-full">
		</div>
	</div>
</div>

<style>
	:global(html,body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
		'Open Sans', 'Helvetica Neue', sans-serif;
		/*min-height: 100vh;*/
		overflow: hidden;
	}
	.container{
		min-width: 98%;
		height: 100%;
		flex-direction: row;
		justify-content: left;
		gap: 2%;
	}
	.background{
		/*background-color: #092327;*/
		/*background-color: #092327;*/
		width: 100%;
		height: 100vh;
		align-items: center;
		flex-direction: column;
	}
</style>
