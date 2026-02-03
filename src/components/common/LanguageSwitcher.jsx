import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const languages = ['en', 'es', 'de', 'fr', 'it'];

  const currentLang = (() => {
    const seg = router.pathname.split('/')[1];
    return languages.includes(seg) ? seg : 'en';
  })();

  const buildPath = (targetLang) => {
    const segments = router.asPath.split('/');
    if (languages.includes(segments[1])) {
      segments[1] = targetLang === 'en' ? '' : targetLang;
    } else if (targetLang !== 'en') {
      segments.splice(1, 0, targetLang);
    }
    const path = segments.filter(Boolean).join('/');
    return `/${path}`;
  };

  return (
    <div className="language-switcher" style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      marginRight: '15px'
    }}>
      {languages.map((lang) => {
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
