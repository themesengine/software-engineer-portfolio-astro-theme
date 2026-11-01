import {
    getCollection
} from "astro:content";

const WORDS_PER_MINUTE = 220;

export function readingTime(body = "") {
    const words =
        body.split(/\s+/).filter(Boolean).length;

    return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`;
}

// All articles, newest first.
export async function getArticles() {
    const articles =
        await getCollection("articles");

    return articles.sort((first, second) => (
        second.data.publishedAt - first.data.publishedAt
    ));
}

// Up to `limit` other articles, same category first.
export function getRelatedArticles(article, articles, limit = 3) {
    const others =
        articles.filter((candidate) => candidate.id !== article.id);

    return [
        ...others.filter((candidate) => candidate.data.category === article.data.category),
        ...others.filter((candidate) => candidate.data.category !== article.data.category)
    ].slice(0, limit);
}
