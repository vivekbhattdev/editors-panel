import { writable } from 'svelte/store';

import { browser } from '$app/environment';

export const THEME_STORAGE_KEY = 'editors-panel-theme';

export type ThemeMode = 'light' | 'dark';

function load(): ThemeMode {
	if (!browser) return 'light';
	return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
}

function apply(mode: ThemeMode) {
	if (!browser) return;
	document.documentElement.classList.toggle('dark', mode === 'dark');
	localStorage.setItem(THEME_STORAGE_KEY, mode);
}

export const themeMode = writable<ThemeMode>(load());

themeMode.subscribe((mode) => {
	apply(mode);
});
