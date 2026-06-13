import React from 'react'

export async function getServerSideProps({ res }) {
  if (res) res.statusCode = 503
  return { props: {} }
}

export default function Maintenance() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Site en construction</h1>
      <p style={{ color: '#555' }}>Nous travaillons sur le site. Revenez bientôt.</p>
    </div>
  )
}
