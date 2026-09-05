import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const ALL_LANGUAGES = ['en', 'es', 'de', 'fr', 'it', 'pt'];
const VISIBLE_LANGUAGES = ['en', 'es'];

const LanguageSwitcher = () => {
  const router = useRouter();

  const currentLang = (() => {
    const seg = router.asPath.split('?')[0].split('/')[1];
    return ALL_LANGUAGES.includes(seg) ? seg : 'es';
  })();

  const buildPath = (targetLang) => {
    const [pathWithQuery, hash = ''] = router.asPath.split('#');
    const [pathname, query = ''] = pathWithQuery.split('?');
    const queryParams = new URLSearchParams(query);
    const segments = pathname.split('/');
    if (ALL_LANGUAGES.includes(segments[1])) {
      segments[1] = targetLang === 'es' ? '' : targetLang;
    } else if (targetLang !== 'es') {
      segments.splice(1, 0, targetLang);
    } else if (targetLang === 'en') {
      segments.splice(1, 0, 'en');
    } else {
      return router.asPath || '/';
    }
    const path = `/${segments.filter(Boolean).join('/')}`;
    const visibleQuery = queryParams.toString();
    return `${path}${visibleQuery ? `?${visibleQuery}` : ''}${hash ? `#${hash}` : ''}`;
  };

  return (
    <div className="language-switcher" style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginRight: '15px'
    }}>
      {VISIBLE_LANGUAGES.map((lang) => {
        const active = currentLang === lang;
        const label = lang.toUpperCase();
        return (
          <Link href={buildPath(lang)} key={lang}>
            <button
              className={`lang-btn ${active ? 'active' : ''}`}
              style={{
                padding: '5px 10px',
                border: active ? '2px solid #000' : '1px solid #ccc',
                borderRadius: '4px',
                background: active ? '#000' : '#fff',
                color: active ? '#fff' : '#000',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: active ? '700' : '500',
                transition: 'all 0.2s ease'
              }}
            >
              {label}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
