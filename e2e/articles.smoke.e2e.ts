import { expect, test } from '@playwright/test';

test('articles page loads, Draft filter updates list', async ({ page }) => {
	// Use the same origin you use to run the app (see note below).
	await page.goto('http://localhost:5173/articles');

	await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible();
	await expect(
		page.getByRole('link', { name: /Architectures of Tomorrow/i })
	).toBeVisible({ timeout: 15_000 });

	await page.getByRole('button', { name: 'Draft' }).click();

	await expect(
		page.getByRole('link', { name: /Understanding React Server Components/i })
	).toBeVisible({ timeout: 15_000 });

	await expect(page.getByRole('link', { name: /Architectures of Tomorrow/i })).toHaveCount(0);
});

test('creates a new article from the modal and shows it in the list', async ({ page }) => {
	const title = `E2E Article ${Date.now()}`;

	await page.goto('http://localhost:5173/articles');

	await expect(page.getByRole('heading', { name: 'Articles' })).toBeVisible();
	await expect(page.getByRole('link', { name: /Architectures of Tomorrow/i })).toBeVisible({
		timeout: 15_000
	});

	await page.getByRole('button', { name: /New Article/ }).click();
	await expect(page.getByRole('heading', { name: 'Create Article' })).toBeVisible();

	const dialog = page.getByRole('dialog');

	await dialog.locator('#title').fill(title);
	await dialog.locator('#author').fill('Playwright Author');
	await dialog.locator('#content').fill('Content created by Playwright e2e.');
	await dialog.locator('#status').selectOption('Draft');

	await dialog.getByRole('button', { name: /Create/ }).click();

	await expect(page.getByRole('heading', { name: 'Create Article' })).not.toBeVisible({
		timeout: 15_000
	});

	await expect(page.getByRole('link', { name: title })).toBeVisible({ timeout: 15_000 });
});