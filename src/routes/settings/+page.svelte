<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';

	import { themeMode, type ThemeMode } from '$lib/theme';
	import Button from '$lib/components/ui/button/Button.svelte';

	function setMode(mode: ThemeMode) {
		themeMode.set(mode);
	}
</script>

<div class="bg-background">
	<div class="mx-auto max-w-5xl p-6 md:p-8">
		<h1 class="text-foreground text-2xl font-semibold">Settings</h1>
		<p class="text-muted-foreground mt-1">Configure the editors panel.</p>

		<section class="border-border bg-card text-card-foreground mt-8 rounded-lg border p-5 shadow-sm">
			<h2 class="text-foreground text-base font-medium">Appearance</h2>
			<p class="text-muted-foreground mt-1 text-sm">Choose light or dark theme for the panel.</p>

			<div
				class="border-border bg-muted/40 mt-4 inline-flex rounded-md border p-1 gap-4"
				role="group"
				aria-label="Theme"
			>
				<Button
					type="button"
					variant={$themeMode === 'light' ? 'primary' : 'ghost'}
					// class="inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors {$themeMode ===
					// 'light'
					// 	? 'bg-background text-foreground shadow-sm'
					// 	: 'text-muted-foreground hover:text-foreground'}"
					onclick={() => setMode('light')}
				>
					<Sun class="h-4 w-4" aria-hidden="true" />
					Light
				</Button>
				<Button
					type="button"
					variant={$themeMode === 'dark' ? 'primary' : 'ghost'}
					// class="inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors {$themeMode ===
					// 'dark'
					// 	? 'bg-background text-foreground shadow-sm'
					// 	: 'text-muted-foreground hover:text-foreground'}"
					onclick={() => setMode('dark')}
				>
					<Moon class="h-4 w-4" aria-hidden="true" />
					Dark
				</Button>
			</div>
		</section>
	</div>
</div>
