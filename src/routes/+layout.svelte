<script lang="ts">
	import { page } from '$app/state';
	import '$lib/theme';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AppLayout from '$lib/components/AppLayout.svelte';

	let { children } = $props();

	const activeNav = $derived(
		page.url.pathname.startsWith('/settings') ? 'settings' : 'articles'
	);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<AppLayout activeNav={activeNav}>
	{@render children()}
</AppLayout>
