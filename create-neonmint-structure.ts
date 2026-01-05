// create-neonmint-structure.ts (updated with site-wide navigation, dark mode, view transitions, and typography)

import fs from 'fs';
import path from 'path';

const ROOT = 'NeonMint';

function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  } else {
    console.log(`Directory already exists: ${dirPath}`);
  }
}

function createFile(filePath: string, content: string = ''): void {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Created file: ${filePath}`);
  } else {
    console.log(`File already exists, skipping: ${filePath}`);
  }
}

// Start
ensureDir(ROOT);
process.chdir(ROOT);

// public/
ensureDir('public');
ensureDir('public/images/posts');
ensureDir('public/images/projects');

// Placeholder public images
createFile('public/images/projects/example.jpg', '// Placeholder project image');
createFile('public/images/posts/placeholder.jpg', '// Placeholder post image');

// src/assets/ for optimized images
ensureDir('src/assets/posts');
ensureDir('src/assets/projects');
createFile('src/assets/posts/example-hero.jpg', '// Placeholder hero image');
createFile('src/assets/projects/example.jpg', '// Placeholder project image');

// Favicon & manifest
const publicFiles = [
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'site.webmanifest',
];
publicFiles.forEach((file) => createFile(path.join('public', file)));

// src/ directories
ensureDir('src/components/blog');
ensureDir('src/components/layout');
ensureDir('src/components/portfolio');
ensureDir('src/components/ui');
ensureDir('src/icons');
ensureDir('src/layouts');
ensureDir('src/pages/blog/posts');
ensureDir('src/pages/blog/tags');
ensureDir('src/pages/blog/techs');
ensureDir('src/pages/portfolio/projects');
ensureDir('src/scripts');
ensureDir('src/styles');
ensureDir('src/utils');

// Content collections
ensureDir('src/content/blog');
ensureDir('src/content/projects');

// Example content
createFile('src/content/blog/example-post.md', `---
title: "Example Blog Post"
description: "This is a placeholder blog post using content collections."
pubDate: 2026-01-01
tags: ["example", "astro"]
heroImage: "/assets/posts/example-hero.jpg"
---

Welcome to my first blog post created with Astro content collections!
`);

createFile('src/content/blog/second-post.md', `---
title: "Second Example Post"
description: "Another example demonstrating dynamic routing."
pubDate: 2026-01-15
tags: ["astro", "typescript"]
---

This is the second example post.
`);

createFile('src/content/projects/example-project.md', `---
title: "Example Project"
description: "A showcase project using content collections."
pubDate: 2026-01-01
techs: ["Astro", "TypeScript"]
featured: true
image: "/assets/projects/example.jpg"
link: "https://github.com/example/repo"
---

Description of the example project.
`);

// Tailwind configuration (now with config file for typography plugin)
createFile('tailwind.config.mjs', `import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        accent: 'var(--color-accent)',
        'muted-foreground': 'var(--color-muted-foreground)',
      },
    },
  },
  plugins: [typography],
};
`);

createFile('src/styles/tailwind.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-background: oklch(0.99 0.005 240);
  --color-foreground: oklch(0.2 0.05 240);
  --color-card: oklch(0.97 0.005 240);
  --color-accent: oklch(0.7 0.2 160); /* Mint neon accent */
  --color-muted-foreground: oklch(0.5 0.02 240);
}

.dark {
  --color-background: oklch(0.12 0.02 240);
  --color-foreground: oklch(0.95 0.05 240);
  --color-card: oklch(0.18 0.02 240);
  --color-muted-foreground: oklch(0.65 0.02 240);
  --color-accent: oklch(0.8 0.25 160);
}

body {
  @apply bg-background text-foreground transition-colors duration-300;
}
`);

// Base Layout with Header, Footer, View Transitions, and client scripts
createFile('src/layouts/Layout.astro', `---
import { ClientRouter } from 'astro:transitions';
const { title = 'NeonMint' } = Astro.props;
---

<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <ClientRouter />
  </head>
  <body class="flex flex-col min-h-screen">
    <header class="bg-card shadow-md sticky top-0 z-50">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <a href="/" class="text-2xl font-bold text-accent">NeonMint</a>
          <ul class="hidden md:flex items-center space-x-8">
            <li><a href="/" class="hover:text-accent transition">Home</a></li>
            <li><a href="/blog" class="hover:text-accent transition">Blog</a></li>
            <li><a href="/portfolio" class="hover:text-accent transition">Portfolio</a></li>
            <li><a href="/about-me" class="hover:text-accent transition">About</a></li>
          </ul>
          <div class="flex items-center space-x-4">
            <button id="theme-toggle" aria-label="Toggle dark mode" class="p-2 rounded hover:bg-muted">
              <!-- Sun icon (light mode) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.636 6.636l-.707-.707m12.728 0l-.707.707M6.636 17.636l-.707.707m6.364 0v-1m0-9v-1" />
              </svg>
              <!-- Moon icon (dark mode) -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hidden dark:inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <button id="mobile-menu-button" aria-label="Open menu" class="md:hidden p-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <ul id="mobile-menu" class="hidden flex-col space-y-4 mt-4 md:hidden">
          <li><a href="/" class="block hover:text-accent transition">Home</a></li>
          <li><a href="/blog" class="block hover:text-accent transition">Blog</a></li>
          <li><a href="/portfolio" class="block hover:text-accent transition">Portfolio</a></li>
          <li><a href="/about-me" class="block hover:text-accent transition">About</a></li>
        </ul>
      </nav>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-card py-8 text-center text-muted-foreground">
      <p>&copy; ${new Date().getFullYear()} NeonMint. All rights reserved.</p>
    </footer>

    <script>
      // Dark mode toggle
      const themeToggle = document.getElementById('theme-toggle');
      themeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      });

      // Initialize theme
      if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }

      // Mobile menu toggle
      const mobileButton = document.getElementById('mobile-menu-button');
      const mobileMenu = document.getElementById('mobile-menu');
      mobileButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    </script>
  </body>
</html>
`);

// Wrapper layouts
createFile('src/layouts/MarkdownPostLayout.astro', `---
import Layout from './Layout.astro';
---

<Layout title={Astro.props.title}>
  <article class="container mx-auto px-4 py-16 prose dark:prose-invert max-w-3xl mx-auto">
    <slot />
  </article>
</Layout>
`);

createFile('src/layouts/ProjectLayout.astro', `---
import Layout from './Layout.astro';
---

<Layout title={Astro.props.title}>
  <article class="container mx-auto px-4 py-16 max-w-4xl">
    <slot />
  </article>
</Layout>
`);

createFile('src/layouts/MarkdownAbout.astro', `---
import Layout from './Layout.astro';
---

<Layout title="About Me">
  <section class="container mx-auto px-4 py-16 prose dark:prose-invert max-w-3xl mx-auto">
    <slot />
  </section>
</Layout>
`);

// Pages updated to use consistent styling
createFile('src/pages/index.astro', `---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Home">
  <section class="container mx-auto px-4 py-20 text-center">
    <h1 class="text-5xl font-bold mb-8">Welcome to NeonMint</h1>
    <p class="text-xl text-muted-foreground mb-12">A modern personal portfolio and blog built with Astro, Tailwind CSS, and cutting-edge features.</p>
    <div class="grid md:grid-cols-2 gap-12">
      <a href="/blog" class="bg-card p-8 rounded-lg shadow hover:shadow-xl transition">
        <h2 class="text-3xl font-semibold mb-4">Blog →</h2>
        <p class="text-muted-foreground">Read my latest thoughts and tutorials.</p>
      </a>
      <a href="/portfolio" class="bg-card p-8 rounded-lg shadow hover:shadow-xl transition">
        <h2 class="text-3xl font-semibold mb-4">Portfolio →</h2>
        <p class="text-muted-foreground">Explore my projects and work.</p>
      </a>
    </div>
  </section>
</Layout>
`);

createFile('src/pages/about-me.md', `---
layout: ../../layouts/MarkdownAbout.astro
---

# About Me

Introduce yourself here. This page uses the shared site layout with navigation and dark mode support.
`);

createFile('src/pages/blog/index.astro', `---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { Image } from 'astro:assets';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<Layout title="Blog">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-5xl font-bold mb-12 text-center">Blog Posts</h1>
    <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedPosts.map(post => (
        <li class="bg-card rounded-lg shadow hover:shadow-xl transition">
          <a href={\`/blog/\${post.slug}\`} class="block">
            {post.data.heroImage && (
              <Image src={post.data.heroImage} alt={\`Hero for \${post.data.title}\`} width={800} height={400} class="w-full rounded-t-lg object-cover" />
            )}
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-2">{post.data.title}</h2>
              <time class="text-sm text-muted-foreground">{post.data.pubDate.toLocaleDateString()}</time>
            </div>
          </a>
        </li>
      ))}
    </ul>
  </section>
</Layout>
`);

createFile('src/pages/blog/[slug].astro', `---
import { getEntry } from 'astro:content';
import MarkdownPostLayout from '../../layouts/MarkdownPostLayout.astro';

const { slug } = Astro.params;
const post = await getEntry('blog', slug);

if (!post) {
  return Astro.redirect('/404');
}

const { Content } = await post.render();
---

<MarkdownPostLayout title={post.data.title}>
  <header class="mb-12 text-center -mt-8">
    <h1 class="text-5xl font-bold mb-4">{post.data.title}</h1>
    <time class="text-muted-foreground">{post.data.pubDate.toLocaleDateString()}</time>
    {post.data.tags && <p class="mt-4 text-muted-foreground">Tags: {post.data.tags.join(', ')}</p>}
  </header>
  <Content />
</MarkdownPostLayout>
`);

createFile('src/pages/portfolio/index.astro', `---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';
import { Image } from 'astro:assets';

const projects = await getCollection('projects');
const sortedProjects = projects.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<Layout title="Portfolio">
  <section class="container mx-auto px-4 py-16">
    <h1 class="text-5xl font-bold mb-12 text-center">Projects</h1>
    <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedProjects.map(project => (
        <li class="bg-card rounded-lg shadow hover:shadow-xl transition">
          <a href={\`/portfolio/\${project.slug}\`} class="block">
            {project.data.image && (
              <Image src={project.data.image} alt={\`Cover for \${project.data.title}\`} width={800} height={600} class="w-full rounded-t-lg object-cover" />
            )}
            <div class="p-6">
              <h2 class="text-2xl font-semibold mb-2">{project.data.title}</h2>
              {project.data.featured && <span class="text-sm text-accent">(Featured)</span>}
            </div>
          </a>
        </li>
      ))}
    </ul>
  </section>
</Layout>
`);

createFile('src/pages/portfolio/[slug].astro', `---
import { getEntry } from 'astro:content';
import ProjectLayout from '../../layouts/ProjectLayout.astro';
import { Image } from 'astro:assets';

const { slug } = Astro.params;
const project = await getEntry('projects', slug);

if (!project) {
  return Astro.redirect('/404');
}

const { Content } = await project.render();
---

<ProjectLayout title={project.data.title}>
  <h1 class="text-5xl font-bold mb-6">{project.data.title}</h1>
  <p class="text-xl text-muted-foreground mb-8">{project.data.description}</p>
  <p class="mb-4">Technologies: <span class="font-medium">{project.data.techs.join(', ')}</span></p>
  {project.data.link && <p class="mb-8"><a href={project.data.link} target="_blank" class="text-accent underline hover:opacity-80">View Project →</a></p>}
  {project.data.image && <Image src={project.data.image} alt={project.data.title} width={1200} height={800} class="w-full rounded-lg shadow-lg mb-8 object-cover" />}
  <div class="prose dark:prose-invert">
    <Content />
  </div>
</ProjectLayout>
`);

createFile('src/pages/404.astro', `---
import Layout from '../layouts/Layout.astro';
---

<Layout title="404 - Not Found">
  <section class="container mx-auto px-4 py-32 text-center">
    <h1 class="text-7xl font-bold mb-8">404</h1>
    <p class="text-3xl mb-12 text-muted-foreground">Page Not Found</p>
    <a href="/" class="text-xl text-accent underline hover:opacity-80">Return to Home →</a>
  </section>
</Layout>
`);

// Content collections config (with image schema)
createFile('src/content/config.ts', `import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    heroImage: image().optional(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    techs: z.array(z.string()),
    featured: z.boolean().optional(),
    image: image().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
`);

// Root files
const gitignore = `node_modules/
dist/
.env
.DS_Store
.astro/
`;

const packageJson = JSON.stringify(
  {
    name: "neonmint",
    version: "0.1.0",
    private: true,
    type: "module",
    scripts: {
      dev: "astro dev",
      start: "astro dev",
      build: "astro build",
      preview: "astro preview",
    },
    dependencies: {
      astro: "^6.0.0",
      "@tailwindcss/vite": "^4.0.0",
      tailwindcss: "^4.0.0",
      "@tailwindcss/typography": "^0.5.10",
    },
  },
  null,
  2
);

const astroConfig = `import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://example.com',
  vite: {
    plugins: [tailwindcss()],
  },
});
`;

const readme = `# NeonMint

A fully featured Astro-based personal portfolio and blog.

## Features
- Content collections with type-safe schemas
- Dynamic routing for blog posts and projects
- Built-in image optimization (astro:assets)
- Tailwind CSS v4 with dark mode (class strategy) and typography
- Responsive navigation header with mobile menu
- Dark/light mode toggle with system preference support
- Smooth page transitions via Astro View Transitions
- Consistent site-wide layout with header and footer
- Custom 404 page

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

The site now includes full navigation, dark mode, and smooth transitions between pages.
`;

const tsconfig = JSON.stringify(
  {
    extends: "astro/tsconfigs/strict",
    include: ["src"],
  },
  null,
  2
);

const rootFiles: Record<string, string> = {
  '.gitignore': gitignore,
  'package.json': packageJson,
  'astro.config.mjs': astroConfig,
  'README.md': readme,
  'tsconfig.json': tsconfig,
};

Object.entries(rootFiles).forEach(([filename, content]) => createFile(filename, content));

console.log('\nProject structure creation completed with navigation, dark mode, view transitions, and enhanced styling.');
