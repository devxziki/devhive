import Link from 'next/link'

export default function Home() {
  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: '#0D1117',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px'
    }}>
      <h1 style={{ color: '#E6EDF3', fontSize: '2.5rem', fontWeight: 700 }}>
        DevHive
      </h1>
      <p style={{ color: '#9DA7B3', fontSize: '1.1rem' }}>
        Build. Learn. Collaborate.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="/login" style={{
          backgroundColor: '#3B82F6',
          color: 'white',
          padding: '10px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 500
        }}>
          Sign In
        </Link>
        <Link href="/register" style={{
          border: '1px solid #30363D',
          color: '#E6EDF3',
          padding: '10px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 500
        }}>
          Sign Up
        </Link>
      </div>
    </main>
  )
}