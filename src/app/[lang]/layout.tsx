import { defineI18nUI } from 'fumadocs-ui/i18n';
import { i18n } from '@/lib/i18n';
import { Provider } from '@/components/provider';
import '../global.css';
import type { Metadata } from 'next';
import { createMetadata, baseUrl } from '@/lib/metadata';
import { notFound } from 'next/navigation';

const { provider } = defineI18nUI(i18n, {
  translations: {
    zh: {
      displayName: '简体中文',
      search: '搜索文档',
      searchNoResult: '没有结果',
      toc: '目录',
      lastUpdate: '最后更新于',
      chooseTheme: '选择主题',
      chooseLanguage: '选择语言',
      nextPage: '下一页',
      previousPage: '上一页',
      tocNoHeadings: '目录为空',
    },
  },
});

const titleMap: Record<
  string,
  { default: string; template: string; description: string }
> = {
  zh: {
    default: 'New API API 参考',
    template: '%s | New API API 参考',
    description:
      'New API 完整 API 参考，覆盖 AI 模型接口与管理接口。',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = (await params).lang;
  const titles = titleMap[lang] || titleMap.zh;

  return createMetadata({
    metadataBase: baseUrl,
    title: {
      default: titles.default,
      template: titles.template,
    },
    description: titles.description,
    keywords: [
      'New API',
      'API Reference',
      'OpenAI Compatible',
      'AI Gateway',
      'Chat Completions',
      'Embeddings',
      'Management API',
      'OpenAPI',
    ],
    authors: [
      { name: 'New API Team', url: 'https://github.com/QuantumNous/new-api' },
    ],
    creator: 'New API Team',
    alternates: {
      languages: {
        zh: '/zh/docs/api',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang,
      title: titles.default,
      description: titles.description,
      siteName: 'New API',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles.default,
      description: titles.description,
    },
  });
}

export async function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}) {
  const lang = (await params).lang;

  // Check if the language is valid, prevent invalid language codes (e.g. 'api') from causing errors
  if (!i18n.languages.includes(lang as (typeof i18n.languages)[number])) {
    notFound();
  }

  return (
    <Provider i18n={provider(lang)}>
      {children}
    </Provider>
  );
}
