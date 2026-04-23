# BCH 360° — API Documentation

OpenAPI 3 spec generated from Zod schemas. Serve at `/api/docs` via Swagger UI (admin-only).

## Status

Scaffolded. Generator implementation pending — see `bch-docs-writer/SKILL.md` for the pattern using `@asteasolutions/zod-to-openapi`.

## Intended layout

```
docs/api/
├── README.md            this file
├── openapi.yaml         generated on every build
└── openapi-preview.html Swagger UI preview (optional)
```

## See also

- `bch-docs-writer` skill
- `server/routes/*.js` — each should export its Zod schemas alongside the router
