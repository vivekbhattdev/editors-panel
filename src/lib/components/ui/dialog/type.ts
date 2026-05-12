import type { Snippet } from 'svelte';
import type { ButtonVariant } from '../button/types';

export type DialogProps = {
	open?: boolean;
	title: string;
	message: string;
  variant?: ButtonVariant;
	okLabel?: string;
	cancelLabel?: string;
	onOk?: () => void;
	onCancel?: () => void;
	showClose?: boolean;
};