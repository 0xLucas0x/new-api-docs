# new-api-docs-v1

A standalone Next.js API reference site for New API.

## Development

Run the development server:

```bash
bun install

bun run dev
```

Open http://localhost:3000 with your browser to see the result.

## API Reference Content

This customized branch is intentionally trimmed to API reference content only.
The current generated reference set is published in Chinese (`zh`) because the local OpenAPI generation pipeline only emits the detailed API tree for that locale.

- `/zh/docs/api`
- `/zh/docs/api/**`

Non-API sections such as guide, installation, support, apps, business, and skills are removed from the public surface and redirected back to the API reference landing page.

## OpenAPI Refresh

When upstream API definitions change, regenerate the reference pages before building:

```bash
bun run generate:openapi
```

## Build

Build the application for production:

```bash
bun run build
```

## Docker

Build and run the standalone docs container locally:

```bash
docker build -t new-api-docs .
docker run --rm -p 3001:3000 \
  -e SITE_URL=https://docs.newapi.pro \
  -e NEXT_PUBLIC_SITE_URL=https://docs.newapi.pro \
  new-api-docs
```

## Project Structure

| Path                      | Description                  |
| ------------------------- | ---------------------------- |
| `app/(home)`              | Redirect-only home flow      |
| `app/[lang]/docs`         | Documentation pages (i18n)   |
| `app/api/search/route.ts` | Search API endpoint          |
| `content/docs/`           | Documentation content (MDX)  |
| `lib/source.ts`           | Content source configuration |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API
