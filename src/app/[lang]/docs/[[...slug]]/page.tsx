import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound, redirect } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Feedback } from '@/components/feedback';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import { onRateAction } from '@/lib/github';

// GitHub repository info for source links
const owner = 'QuantumNous';
const repo = 'new-api-docs-v1';
const branch = 'main';

export default async function Page(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}) {
  const { slug, lang } = await props.params;
  const apiRoot = `/${lang}/docs/api`;

  if (!slug || slug.length === 0 || slug[0] !== 'api') {
    redirect(apiRoot);
  }
  if (slug.length > 1 && slug[1] !== 'ai-model') {
    redirect(apiRoot);
  }

  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body as any;
  const lastModified = page.data.lastModified;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={lastModified ? new Date(lastModified) : undefined}
      tableOfContent={{
        style: 'clerk',
        // Disable TOC in 'full' mode (OpenAPI page) to enable two-column layout
        enabled: !page.data.full,
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="docs-page-description mb-2">
        {page.data.description}
      </DocsDescription>
      <div className="docs-page-toolbar mb-6 flex flex-row flex-wrap items-center gap-2 pb-6">
        <LLMCopyButton
          markdownUrl={`/${lang}/llms.mdx/${page.slugs.join('/')}`}
          lang={lang}
        />
        <ViewOptions
          markdownUrl={`/${lang}/llms.mdx/${page.slugs.join('/')}`}
          githubUrl={`https://github.com/${owner}/${repo}/blob/${branch}/content/docs/${page.path}`}
          lang={lang}
        />
      </div>
      <DocsBody className="docs-page-body">
        <div className="docs-page-panel">
          <MDX
            components={getMDXComponents({
              a: createRelativeLink(source, page) as any,
            })}
          />
        </div>
      </DocsBody>
      <Feedback lang={lang} onRateAction={onRateAction} />
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { slug, lang } = await props.params;
  if (
    !slug ||
    slug.length === 0 ||
    slug[0] !== 'api' ||
    (slug.length > 1 && slug[1] !== 'ai-model')
  ) {
    return {
      title: 'API Reference',
    };
  }
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImage(page).url },
  };
}
