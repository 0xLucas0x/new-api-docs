import Link from 'next/link';
import { getLocalePath } from '@/lib/i18n';

interface FooterProps {
  lang: string;
}

interface FooterTranslation {
  apiIndex: string;
  copyright: string;
}

const translations: Record<string, FooterTranslation> = {
  zh: {
    apiIndex: 'API 首页',
    copyright: '© 2025 锟腾科技. All Rights Reserved.',
  },
  en: {
    apiIndex: 'API Index',
    copyright: '© 2025 QuantumNous. All Rights Reserved.',
  },
  ja: {
    apiIndex: 'API インデックス',
    copyright: '© 2025 QuantumNous. All Rights Reserved.',
  },
};

export function Footer({ lang }: FooterProps) {
  const t = translations[lang] || translations.en;

  return (
    <footer className="docs-footer mt-12 border-t border-fd-border/70">
      <div className="w-full px-6 pb-10 pt-6">
        <div className="docs-footer-meta flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p>{t.copyright}</p>
            <p>OGOG.AI</p>
          </div>
          <p>
            <Link
              href={getLocalePath(lang, 'docs/api')}
              className="hover:text-fd-foreground transition-colors"
            >
              {t.apiIndex}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
