export const revalidate = 60;

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      position: 'relative', 
      zIndex: 10,
      padding: '20px'
    }}>
      <div className="glass-card" style={{ 
        padding: '40px', 
        textAlign: 'center', 
        maxWidth: '400px', 
        width: '100%',
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)'
      }}>
        <h2 style={{ 
          margin: '0 0 24px 0', 
          fontSize: '1.5rem', 
          fontFamily: 'var(--font-sans)', 
          fontWeight: 600, 
          color: 'var(--text-primary)' 
        }}>
          Amr Samir Edris
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <a href="mailto:contact@amrsamir.me" style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem'
          }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            contact@amrsamir.me
          </a>
          
          <a href="https://wa.me/971507095867" target="_blank" rel="noopener noreferrer" style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem'
          }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +971 50 709 5867
          </a>
          
          <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s',
            fontFamily: 'var(--font-mono)', fontSize: '0.9rem'
          }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            linkedin/amrsamiredris
          </a>
        </div>
      </div>
    </main>
  );
}
