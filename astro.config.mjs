// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
	site: 'https://zcash.school',
	output: 'static',
	adapter: vercel(),
	integrations: [
		starlight({
			title: 'Zcash School',
			description:
				'Learn Zcash from first principles — privacy, zero-knowledge proofs, and how shielded money works.',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: false,
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/zcash' },
				{ icon: 'x.com', label: 'X / Twitter', href: 'https://twitter.com/electriccoinco' },
			],
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://zcash.school/og-image.svg' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:width', content: '1200' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:height', content: '630' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://zcash.school/og-image.svg' },
				},
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#1A1F2E' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				},
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [{ label: 'Welcome', link: '/' }],
				},
				{
					label: '1. Why Privacy Matters',
					items: [{ autogenerate: { directory: 'intro' } }],
				},
				{
					label: '2. Zero-Knowledge Proofs',
					items: [{ autogenerate: { directory: 'zk' } }],
				},
				{
					label: '3. How Zcash Works',
					items: [{ autogenerate: { directory: 'protocol' } }],
				},
				{
					label: '4. Using Zcash',
					items: [{ autogenerate: { directory: 'using' } }],
				},
				{
					label: '5. Ecosystem & Economics',
					items: [{ autogenerate: { directory: 'ecosystem' } }],
				},
				{
					label: 'Resources',
					link: '/resources/',
				},
			],
			lastUpdated: true,
			pagination: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
		}),
		sitemap(),
	],
});
