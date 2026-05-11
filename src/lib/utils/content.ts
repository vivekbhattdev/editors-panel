import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

export function renderArticleHtml(content: string): string {
	let seenParagraph = false;
	const renderer = new marked.Renderer();
	const renderInlineTokens = (tokens: unknown): string => {
		// `marked` render callbacks provide inline tokens (arrays), not strings.
		// Use the parser's inline-token API to avoid runtime errors.
		return (marked.Parser as unknown as { parseInline: (t: unknown, o: unknown) => string }).parseInline(
			tokens,
			{ renderer }
		);
	};

	renderer.heading = ({ tokens, depth }) => {
		const inner = renderInlineTokens(tokens);
		if (depth === 2) {
			return `<h2 class="text-primary mt-8 mb-4 text-xl font-semibold">${inner}</h2>`;
		}
		return `<h${depth}>${inner}</h${depth}>`;
	};

	renderer.paragraph = ({ tokens }) => {
		const inner = renderInlineTokens(tokens);
		if (!seenParagraph) {
			seenParagraph = true;
			return `<p class="mb-4 leading-relaxed text-foreground text-lg font-medium">${inner}</p>`;
		}
		return `<p class="mb-4 leading-relaxed text-foreground/80">${inner}</p>`;
	};

	renderer.blockquote = ({ tokens }) => {
		const inner = marked.parser(tokens);
		const normalized = inner.replace(/^<p>|<\/p>\n?$/g, '');
		return [
			`<blockquote class="border-primary/30 bg-primary/5 my-6 rounded-r-lg border-l-4 py-4 pr-4 pl-6">`,
			`  <p class="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">Editor's Note</p>`,
			`  <p class="text-foreground/80 italic">${normalized}</p>`,
			`</blockquote>`
		].join('\n');
	};

	const html = marked.parse(content ?? '', {
		gfm: true,
		breaks: true,
		renderer
	}) as string;
	return DOMPurify.sanitize(html, {
		USE_PROFILES: { html: true }
	});
}
