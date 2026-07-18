import { defineCollection, z } from "astro:content";

// Case-study collection. Each MDX file under src/content/case-studies/ must
// provide this frontmatter. `slug` is derived from the filename by Astro.
const caseStudies = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        role: z.string(),
        timeframe: z.string(),
        // Short tags rendered as pills on the card and detail header.
        tech: z.array(z.string()),
        // Optional external links shown in the header.
        repo: z.string().url().optional(),
        liveUrl: z.string().url().optional(),
        // Controls ordering on the homepage (lower shows first).
        order: z.number().default(0),
        draft: z.boolean().default(false),
    }),
});

export const collections = {
    "case-studies": caseStudies,
};
