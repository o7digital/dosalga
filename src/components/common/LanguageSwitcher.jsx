import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

const LanguageSwitcher = () => {
  const router = useRouter();
  const isSpanish = router.pathname.startsWith('/es');

  return (
    <div className="language-switcher" style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      marginRight: '15px'
    }}>
      <Link href={isSpanish ? router.pathname.replace('/es', '') || '/' : router.pathname}>
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
      <Link href={isSpanish ? router.pathname : `/es${router.pathname}`}>
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
