# Case studies are Studies, cross-linked — not a new content type

Status: accepted

A project entry's long-form narrative (case study) could have been a separate "case study" content type attached to projects, or duplicated into the project body. We did neither: case studies are **Studies** entries (the general write-up type) cross-linked to projects through the Study's `projects[]` many-to-many edge. The Project entry carries an overview body only; its detail page queries Studies whose `projects[]` contains its slug. This keeps one writing pipeline, one listing, one design, and avoids any duplication — at the cost that a project's narrative lives outside the projects collection, joined only by slug (build-time validation catches dangling references).
