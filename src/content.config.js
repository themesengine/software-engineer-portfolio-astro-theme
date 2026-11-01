/*
 * Content collections. Each Markdown file in src/content/articles/
 * becomes /journal/<file-name>. The build fails with a clear message if
 * the front matter below is missing or invalid.
 */

import {
    defineCollection
} from "astro:content";
import {
    glob
} from "astro/loaders";
import {
    z
} from "astro/zod";

const articles = defineCollection({
    loader: glob({
        pattern: "**/*.md",
        base: "./src/content/articles"
    }),
    schema: ({image}) => z.object({
        title: z.string().min(1),
        excerpt: z.string().min(1),
        category: z.string().min(1),
        // YYYY-MM-DD, quoted or not. Controls the order.
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        author: z.string().optional(),
        // Relative to the article, e.g. ../../assets/images/journal/slow-mornings.jpg
        image: image(),
        imageAlt: z.string().min(1),
        featured: z.boolean().default(false)
    })
});

export const collections = {
    articles
};
