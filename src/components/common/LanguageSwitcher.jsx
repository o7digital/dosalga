import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const isSpanish = router.pathname.startsWith('/es');

  // Mapping des routes EN vers ES
  const getEnglishPath = () => {
    if (router.pathname === '/es' || router.pathname === '/es/index') return '/';
    if (router.pathname.startsWith('/es/')) {
      return router.pathname.replace('/es/', '/');
    }
    return router.pathname;
  };

  const getSpanishPath = () => {
    if (router.pathname === '/') return '/es';
    if (!router.pathname.startsWith('/es')) {
      return `/es${router.pathname}`;
    }
    return router.pathname;
  };

  return (
    <div className="language-switcher" style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      marginRight: '15px'
    }}>
      <Link href={getEnglishPath()}>
        <button
          className={`lang-btn ${!isSpanish ? 'active' : ''}`}
          style={{
            padding: '5px 12px',
            border: !isSpanish ? '2px solid #000' : '1px solid #ccc',
            borderRadius: '4px',
            background: !isSpanish ? '#000' : '#fff',
            color: !isSpanish ? '#fff' : '#000',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: !isSpanish ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          EN
        </button>
      </Link>
      <Link href={getSpanishPath()}>
        <button
          className={`lang-btn ${isSpanish ? 'active' : ''}`}
          style={{
            padding: '5px 12px',
            border: isSpanish ? '2px solid #000' : '1px solid #ccc',
            borderRadius: '4px',
            background: isSpanish ? '#000' : '#fff',
            color: isSpanish ? '#fff' : '#000',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: isSpanish ? 'bold' : 'normal',
            transition: 'all 0.3s ease'
          }}
        >
          ES
        </button>
      </Link>
    </div>
  );
};

export default LanguageSwitcher;
