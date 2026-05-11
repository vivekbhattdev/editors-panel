<script lang="ts">
	import {
		ChevronLeft,
		ChevronRight,
	} from '@lucide/svelte';
	import Button from "../button/Button.svelte";
  import type { PaginationProps } from "./type";

  let {
		page,
		totalPages,
		total,
		limit,
		onPageChange,
		showSummary = true,
		className = ''
	}: PaginationProps = $props();
  

  const rangeStart = $derived(total === 0 ? 0 : (page - 1) * limit + 1);
	const rangeEnd = $derived(Math.min(page * limit, total));
  const pageItems = $derived(visiblePageItems(page, totalPages));

  function visiblePageItems(
		current: number,
		last: number
	): (number | 'ellipsis')[] {
		if (last <= 7) {
			return Array.from({ length: last }, (_, i) => i + 1);
		}
		const set = new Set<number>([1, last]);
		for (let i = current - 1; i <= current + 1; i++) {
			if (i >= 1 && i <= last) set.add(i);
		}
		const sorted = [...set].sort((a, b) => a - b);
		const out: (number | 'ellipsis')[] = [];
		for (let i = 0; i < sorted.length; i++) {
			if (i > 0 && sorted[i] - sorted[i - 1] > 1) out.push('ellipsis');
			out.push(sorted[i]);
		}
		return out;
	}

  function go(next: number) {
		if (next < 1 || next > totalPages || next === page) return;
		onPageChange?.(next);
	}

</script>


{#if total > 0 && totalPages > 0}
	<nav
		class="mt-4 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between {className}"
		aria-label="Pagination"
	>
		{#if showSummary}
			<p class="text-muted-foreground text-sm">
				Showing
				<span class="text-foreground font-medium">{rangeStart}</span>
				–
				<span class="text-foreground font-medium">{rangeEnd}</span>
				of
				<span class="text-foreground font-medium">{total}</span>
			</p>
		{/if}
		<div class="flex flex-wrap items-center gap-1 {!showSummary ? 'sm:ml-auto' : ''}">
      <Button
        variant="ghost"
        size="sm"
        onclick={() => go(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

			<div class="flex flex-wrap items-center gap-1">
				{#each pageItems as item, i (item === 'ellipsis' ? `gap-${i}` : item)}
					{#if item === 'ellipsis'}
						<span class="text-muted-foreground px-1 text-sm select-none" aria-hidden="true">…</span>
					{:else}
						<Button
              variant={item === page ? 'primary' : 'ghost'}
							aria-current={item === page ? 'page' : undefined}
							aria-label={`Page ${item}`}
							disabled={item === page}
              className="disabled:opacity-100"
							onclick={() => go(item)}
						>
							{item}
						</Button>
					{/if}
				{/each}
			</div>
      <Button
        variant="ghost"
        size="sm"
        onclick={() => go(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight class="h-4 w-4" />
      </Button>
		</div>
	</nav>
{/if}
