// create-neonmint-structure.ts (updated with Tailwind CSS v4 integration)

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

// Favicon & manifest placeholders
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

// Content collections directories
ensureDir('src/content/blog');
ensureDir('src/content/projects');

// Example content files
createFile('src/content/blog/example-post.md', `---
title: "Example Blog Post"
description: "This is a placeholder blog post using content collections."
pubDate: 2026-01-01
tags: ["example", "astro"]
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
title: "Insight Hunter"
description: "A showcase project using content collections."
pubDate: 2026-01-01
techs: ["Astro", "TypeScript"]
featured: true
image: "/images/projects/insight-hunter-hero-image.png"
link: "https://github.com/Insight-Hunter/insighthunter-home.git "
---

Description of the example project.
`);

// src/layouts - updated to import Tailwind styles and use Tailwind classes
const layoutFiles = [
  'Layout.astro',
  'MarkdownAbout.astro',
  'MarkdownPostLayout.astro',
  'ProjectLayout.astro',
];
layoutFiles.forEach((file) =>
  createFile(path.join('src/layouts', file), `---
import '../styles/tailwind.css';
const { title = 'NeonMint' } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-background text-foreground">
    <slot />
  </body>
</html>
`)
);

// src/pages - updated examples with Tailwind classes
createFile('src/pages/about-me.md', `# About Me

Your content here.

<div class="mt-8 p-6 bg-card rounded-lg shadow-lg">
  <p class="text-muted-foreground">Customize this page with Tailwind utilities.</p>
</div>
`);

createFile('src/pages/index.astro', `---
import Layout from '../layouts/BaseLayout.astro';
---

<Layout title="Home">
  <main class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-center mb-8">Welcome to NeonMint</h1>
    <p class="text-xl text-center text-muted-foreground">A modern portfolio and blog built with Astro and Tailwind CSS.</p>
  </main>
</Layout>
`);

// Dynamic blog pages - enhanced with Tailwind
createFile('src/pages/blog/index.astro', `---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

const posts = await getCollection('blog');
const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<Layout title="Blog">
  <main class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold mb-12 text-center">Blog Posts</h1>
    <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedPosts.map(post => (
        <li class="bg-card rounded-lg shadow hover:shadow-lg transition">
          <a href={\`/blog/\${post.slug}\`} class="block p-6">
            <h2 class="text-2xl font-semibold mb-2">{post.data.title}</h2>
            <time class="text-sm text-muted-foreground">{post.data.pubDate.toLocaleDateString()}</time>
          </a>
        </li>
      ))}
    </ul>
  </main>
</Layout>
`);

createFile('src/pages/blog/[slug].astro', `---
import { getCollection, getEntry } from 'astro:content';
import Layout from '../../layouts/MarkdownPostLayout.astro';

const { slug } = Astro.params;
const post = await getEntry('blog', slug);

if (!post) {
  return Astro.redirect('/404');
}

const { Content } = await post.render();
---

<Layout title={post.data.title}>
  <article class="container mx-auto px-4 py-16 prose prose-lg max-w-3xl mx-auto">
    <header class="mb-12 text-center">
      <h1 class="text-5xl font-bold mb-4">{post.data.title}</h1>
      <time class="text-muted-foreground">{post.data.pubDate.toLocaleDateString()}</time>
      {post.data.tags && <p class="mt-4">Tags: {post.data.tags.join(', ')}</p>}
    </header>
    <Content />
  </article>
</Layout>
`);

// Dynamic portfolio pages - enhanced with Tailwind
createFile('src/pages/portfolio/index.astro', `---
import { getCollection } from 'astro:content';
import Layout from '../../layouts/Layout.astro';

const projects = await getCollection('projects');
const sortedProjects = projects.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
---

<Layout title="Portfolio">
  <main class="container mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold mb-12 text-center">Projects</h1>
    <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {sortedProjects.map(project => (
        <li class="bg-card rounded-lg shadow hover:shadow-lg transition">
          <a href={\`/portfolio/\${project.slug}\`} class="block p-6">
            <h2 class="text-2xl font-semibold mb-2">{project.data.title}</h2>
            {project.data.featured && <span class="text-sm text-accent">(Featured)</span>}
          </a>
        </li>
      ))}
    </ul>
  </main>
</Layout>
`);

createFile('src/pages/portfolio/[slug].astro', `---
import { getEntry } from 'astro:content';
import Layout from '../../layouts/ProjectLayout.astro';

const { slug } = Astro.params;
const project = await getEntry('projects', slug);

if (!project) {
  return Astro.redirect('/404');
}

const { Content } = await project.render();
---

<Layout title={project.data.title}>
  <article class="container mx-auto px-4 py-16 max-w-4xl">
    <h1 class="text-5xl font-bold mb-6">{project.data.title}</h1>
    <p class="text-xl text-muted-foreground mb-8">{project.data.description}</p>
    <p class="mb-4">Technologies: <span class="font-medium">{project.data.techs.join(', ')}</span></p>
    {project.data.link && <p class="mb-8"><a href={project.data.link} target="_blank" class="text-accent underline">View Project →</a></p>}
    {project.data.image && <img src={project.data.image} alt={project.data.title} class="w-full rounded-lg shadow-lg mb-8" />}
    <div class="prose prose-lg">
      <Content />
    </div>
  </article>
</Layout>
`);

// Tailwind CSS file
createFile('src/styles/tailwind.css', `@import "tailwindcss";

@theme {
  --color-background: oklch(0.98 0.01 240);
  --color-foreground: oklch(0.2 0.05 240);
  --color-card: oklch(0.95 0.01 240);
  --color-accent: oklch(0.6 0.2 280);
  --color-muted-foreground: oklch(0.5 0.02 240);
}

/* Optional: Add any custom CSS below */
`);

// Other files
createFile('src/pages/robots.txt.ts', '// robots.txt generation\nexport const GET = () => new Response("User-agent: *\\nAllow: /", { headers: { "Content-Type": "text/plain" } });');
createFile('src/pages/rss.xml.js', '// RSS feed generation - implement using getCollection if desired');
createFile('src/scripts/menu.js', '// Menu-related JavaScript\n');
createFile('src/utils/languages.ts', '// Technology/language configuration\nexport const languages: string[] = [];\n');

// Content collections configuration
createFile('src/content/config.ts', `import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    techs: z.array(z.string()),
    featured: z.boolean().optional(),
    image: z.string().optional(),
    link: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  projects: projectsCollection,
};
`);

// Root configuration files - updated for Tailwind v4
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
      astro: "^5.0.0",
      "@tailwindcss/vite": "^4.0.0",
      tailwindcss: "^4.0.0",
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
  // Example other integrations (uncomment and install as needed)
  // integrations: [sitemap(), mdx()],
});
`;

const readme = `# NeonMint

An Astro-based personal portfolio and blog with **content collections**, **dynamic routing**, and **Tailwind CSS v4** integration.

## Features
- Type-safe content collections for blog posts and projects
- Dynamic pages for blog and portfolio with Tailwind-styled layouts
- Modern Tailwind CSS v4 setup using the official Vite plugin
- Responsive design with utility classes applied throughout

## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Tailwind CSS is configured via \`src/styles/tailwind.css\`. Customize themes using the \`@theme\` directive.

Visit example routes:
- http://localhost:4321/
- http://localhost:4321/blog
- http://localhost:4321/blog/example-post
- http://localhost:4321/portfolio
- http://localhost:4321/portfolio/example-project
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

console.log('\nProject structure creation completed with Tailwind CSS v4 integration.');
