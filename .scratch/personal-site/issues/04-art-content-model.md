# Grilling: Art section content model

Type: grilling
Status: claimed

## Question

Pin down the art section's content model and UI. Known so far: curated gallery grid + detail pages, Astro content collections with tags and collections, detail page shows related works from the same collection (falling back to related tags). Content includes **anime-style illustrations, sketches and doodles, and car sketches** — so the taxonomy must accommodate at least these subjects/styles (e.g. tags/collections per subject: anime, cars, doodles; and/or medium/style axes). Decide: exact collection/tag taxonomy (subject vs. style vs. medium — are car sketches a series or a subject tag?), image pipeline (source of truth, compression/responsive variants via astro:assets, aspect-ratio handling), how curation works (featured vs archive), and detail-page layout (process shots? WIP sketches? tools?). Load `grilling` and `domain-modeling` skills.