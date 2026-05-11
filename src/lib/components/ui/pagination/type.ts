import type { Pagination } from '$lib/types/pagination';

export type PaginationProps = {
	page: number;
	onPageChange?: (page: number) => void;
  showSummary?: boolean;
	className?: string;
} & Pick<Pagination, 'total' | 'limit' | 'totalPages'>;