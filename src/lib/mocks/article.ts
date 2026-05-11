import type { Article } from "$lib/types/article";

export const initialArticles: Article[] = [
	{
		id: '1',
		title: 'The Architectures of Tomorrow: Navigating the Neural Landscape',
		content: `As we stand at the precipice of a new era in computational logic, the frameworks we use to build intelligence are shifting. No longer restricted to rigid monolithic structures, the next generation of neural architectures is fluid, modular, and profoundly efficient.

This transition marks a fundamental departure from the last decade of AI development. In the early 2020s, the primary driver of progress was scale—more parameters, more data, more compute. Today, the focus has pivoted toward **Precision Engineering**. We are seeing the rise of sparse models that only activate necessary pathways, drastically reducing the energy footprint of high-level inference.

## The Rise of Sparse Architectures

The core innovation lies in Mixture-of-Experts (MoE) layers. By dividing a large model into specialized sub-networks, or 'experts,' a system can choose which part of itself is most qualified to handle a specific request. This is analogous to a surgical team: you wouldn't ask a cardiologist to perform orthopedic surgery, even though both are medical experts.

> **Editor's Note:** "The efficiency gains observed in these sparse models suggest we might reach AGI milestones with 1/10th of the power consumption previously predicted."

However, these advancements do not come without challenges. The complexity of routing data between experts requires a level of orchestration that tests the limits of our current networking hardware. Latency remains a bottleneck, particularly for real-time edge applications like autonomous flight or medical robotics.`,
		status: 'Published',
		author: 'Dr. Elena Thorne',
		createdAt: '2024-05-24T10:00:00Z',
	},
	{
		id: '2',
		title: 'Building Scalable APIs with Route Handlers',
		content: `Learn how to create robust API endpoints using Next.js Route Handlers with proper error handling, validation, and response patterns.

## Setting Up Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web Request and Response APIs. They are defined in a route.ts file inside the app directory.

## Best Practices

When building APIs, always consider:
- Input validation
- Error handling
- Rate limiting
- Authentication

> **Pro Tip:** Use Zod for runtime type validation to ensure your API receives the correct data shape.`,
		status: 'Published',
		author: 'Marcus Johnson',
		createdAt: '2026-04-28T14:30:00Z',
	},
	{
		id: '3',
		title: 'Understanding React Server Components',
		content: `A deep dive into React Server Components and how they change the way we think about data fetching and component rendering.

## What Are Server Components?

Server Components allow you to write UI that can be rendered and optionally cached on the server. In Next.js, the rendering work is further split by route segments.

## Benefits

- Reduced bundle size
- Direct backend access
- Automatic code splitting`,
		status: 'Draft',
		author: 'Emily Rodriguez',
		createdAt: '2026-04-25T11:00:00Z',
	},
	{
		id: '4',
		title: 'Tailwind CSS Best Practices',
		content: `Optimize your Tailwind CSS workflow with these proven patterns and techniques for maintainable styling in modern applications.

## Organization Strategies

Keep your utility classes organized and readable by following consistent patterns across your codebase.

## Custom Design Systems

Extend Tailwind's configuration to create a cohesive design system that aligns with your brand guidelines.`,
		status: 'Published',
		author: 'David Kim',
		createdAt: '2026-04-20T08:00:00Z',
	},
	{
		id: '5',
		title: 'Authentication Patterns in Modern Apps',
		content: `Explore various authentication strategies including JWT, sessions, and OAuth for secure user management in web applications.`,
		status: 'Draft',
		author: 'Sarah Chen',
		createdAt: '2026-04-15T09:00:00Z',
	},
	{
		id: '6',
		title: 'Database Design for Web Applications',
		content: `A comprehensive guide to designing efficient database schemas for modern web applications with scalability in mind.`,
		status: 'Draft',
		author: 'Marcus Johnson',
		createdAt: '2026-03-10T10:00:00Z',
	},
	{
		id: '7',
		title: 'Optimizing Web Performance',
		content: `Techniques for improving Core Web Vitals and delivering fast user experiences across all devices and network conditions.`,
		status: 'Published',
		author: 'Emily Rodriguez',
		createdAt: '2026-04-08T13:00:00Z',
	},
	{
		id: '8',
		title: 'State Management Strategies',
		content: `Comparing different state management solutions from Context API to Zustand and SWR for React applications.`,
		status: 'Draft',
		author: 'David Kim',
		createdAt: '2026-04-05T15:00:00Z',
	}
];