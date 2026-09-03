import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content' }),
  schema: ({ image }) => z.object({
    title: z.string().nullable().default('无标题'),
    description: z.string().nullable().optional(),
    date: z.coerce.date().nullable().default(new Date('2020')),
    slug: z.string().nullable().optional(),
    draft: z.boolean().nullable().default(false),
    comment: z.boolean().nullable().default(true),
    tags: z.array(z.string()).nullable().default([]),
    series: z.array(z.string()).nullable().default([]),
    nolicense: z.boolean().nullable().default(false),
    from: z.string().nullable().default(''),
    author: z.string().nullable().default('acdzh'),
    cover: image().nullable().optional(),
    categories: z.array(z.string()).nullable().optional(),
    update_date: z.coerce.date().nullable().optional(),
    last_modified: z.coerce.date().nullable().optional(),
    url: z.string().nullable().optional(),
  }),
});

export const collections = { posts };
