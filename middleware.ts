import { createI18nMiddleware } from 'fumadocs-core/i18n/middleware';
import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from 'next/server';
import { i18n } from '@/lib/i18n';

const i18nMiddleware = createI18nMiddleware(i18n);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent
) {
  if (request.nextUrl.pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${i18n.defaultLanguage}/docs/api`;
    return NextResponse.redirect(url);
  }

  return i18nMiddleware(request, event);
}

export const config = {
  // Matcher ignoring API routes, Next.js internals, and static assets
  // Important: exclude metadata routes like `/robots.txt` and `/sitemap.xml`
  // so they won't be redirected to `/{lang}/...` which would 404 unless you implement localized metadata routes.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets/|robots\\.txt|sitemap\\.xml|llms?\\.txt|llm-full\\.txt|llms-full\\.txt).*)',
  ],
};
