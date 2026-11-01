/*
 * A small fixed-window rate limiter kept in memory.
 *
 * It protects a single server or container from form spam. Keys use
 * Astro's clientAddress, which only trusts X-Forwarded-For from hosts listed
 * in security.allowedDomains (see astro.config.mjs). On serverless
 * platforms each instance has its own memory, so use your platform's
 * firewall or a shared store (for example Upstash Redis) if you need a
 * global limit.
 */

const buckets = new Map();

function pruneExpiredBuckets(now) {
    for (const [key, bucket] of buckets) {
        if (bucket.resetAt <= now) {
            buckets.delete(key);
        }
    }
}

export function consumeRateLimit(
    key,
    {
        limit,
        windowInMilliseconds
    }
) {
    const now = Date.now();

    if (buckets.size > 10000) {
        pruneExpiredBuckets(now);
    }

    const bucket = buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
        buckets.set(key, {
            count: 1,
            resetAt: now + windowInMilliseconds
        });

        return {
            allowed: true,
            retryAfterInSeconds: 0
        };
    }

    bucket.count += 1;

    return {
        allowed: bucket.count <= limit,
        retryAfterInSeconds: Math.ceil(
            (bucket.resetAt - now) / 1000
        )
    };
}
