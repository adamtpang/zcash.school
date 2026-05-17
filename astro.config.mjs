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
			title: 'zcash.school',
			description:
				'Learn Zcash from first principles: privacy, zero-knowledge proofs, and how shielded money works.',
			social: [
				{ icon: 'github', label: 'GitHub (source)', href: 'https://github.com/adamtpang/zcash.school' },
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/zcash' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/zcash' },
			],
			components: {
				Header: './src/components/Header.astro',
			},
			customCss: ['./src/styles/custom.css'],
			head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://zcash.school/og-image.png' },
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
					attrs: { name: 'twitter:image', content: 'https://zcash.school/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { name: 'theme-color', content: '#0C0D10' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/x-icon', sizes: 'any', href: '/favicon.ico' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				},
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [{ label: 'Welcome', link: '/' }],
				},
				{
					label: 'Network School',
					items: [
						{ label: 'ZNS landing', link: '/ns/' },
						{ label: 'Get a wallet in 60s', link: '/start/' },
						{ label: 'Claim $5 in ZEC', link: '/claim/' },
						{ label: 'Accept Zcash (merchants)', link: '/merchants/' },
						{ label: 'Team & sister projects', link: '/team/' },
					],
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
					label: 'Project',
					items: [
						{ label: 'About', link: '/about/' },
						{ label: 'Blog', link: '/blog/' },
						{ label: 'Roadmap', link: '/roadmap/' },
						{ label: 'Changelog', link: '/changelog/' },
						{ label: 'Resources', link: '/resources/' },
					],
				},
			],
			lastUpdated: true,
			pagination: true,
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 4 },
		}),
		sitemap(),
	],
});
