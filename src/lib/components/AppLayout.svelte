<script lang="ts">
	import { goto } from '$app/navigation';
	import { FileText, Settings, Menu } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import Button from './ui/button/Button.svelte';

	type NavItem = 'articles' | 'settings';

	let { 
    children,
    activeNav = 'articles',
  }: {
    children: Snippet;
    activeNav?: NavItem;
  } = $props();

	let isSidebarOpen = $state(false);

	const navItems: { id: NavItem; label: string }[] = [
		{ id: 'articles', label: 'Articles' },
		{ id: 'settings', label: 'Settings' }
	];

	function iconFor(id: NavItem) {
		switch (id) {
			case 'articles':
				return FileText;
			case 'settings':
				return Settings;
		}
	}

	function handleNavClick(nav: NavItem) {
		isSidebarOpen = false;
		const path = nav === 'settings' ? '/settings' : '/articles';
		void goto(path);
	}

</script>

<div class="bg-background min-h-screen">
	<!-- Mobile Header -->
	<header
		class="border-border bg-card sticky top-0 z-40 flex h-14 items-center justify-between border-b px-4 lg:hidden"
	>
		<div class="flex items-center gap-3">
      <Button
        variant="outline"
        iconOnlyLabel="Open menu"
        className="-ml-2"
        onclick={() => (isSidebarOpen = true)}
      >
        <Menu class="h-5 w-5" />
      </Button>
			<span class="text-primary font-semibold">Editors Panel</span>
		</div>
	</header>

	{#if isSidebarOpen}
		<button
			type="button"
			class="bg-foreground/20 fixed inset-0 z-40 lg:hidden"
			onclick={() => (isSidebarOpen = false)}
			aria-label="Close menu overlay"
		></button>
	{/if}

	<!-- Sidebar -->
	<aside
		class="border-border bg-sidebar fixed top-0 left-0 z-50 h-full w-64 transform border-r transition-transform duration-200 ease-in-out lg:translate-x-0 {isSidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
	>
		<div class="border-border flex h-14 items-center gap-3 border-b px-4">
			<Menu class="text-muted-foreground h-5 w-5" />
			<span class="text-primary font-semibold">Editors Panel</span>
		</div>


		<nav class="p-4">
			<ul class="space-y-1">
				{#each navItems as item (item.id)}
					{@const Icon = iconFor(item.id)}
					<li>
            <Button
              variant={activeNav === item.id ? 'primary' : 'ghost'}
              className="w-full justify-start"
              onclick={() => handleNavClick(item.id)}
            >
              <Icon class="h-5 w-5" />
              {item.label}
            </Button>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>

	<main class="lg:ml-64">
		{@render children()}
	</main>
</div>
