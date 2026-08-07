'use client';

export default function LinkedInFeed() {
  return (
    <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', margin: '32px 0' }}>
      <h3 style={{ marginBottom: '16px', fontSize: 'var(--text-lg)' }}>Latest Updates from LinkedIn</h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'left', marginTop: '24px' }}>
        {/* Placeholder Post 1 */}
        <div style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)' }}></div>
            <div>
              <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>Amr Samir Edris</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>1w ago</div>
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Excited to share the success of our recent COP28 activation. The scale of this mega-event challenged our team to rethink crowd flow and digital engagement...
          </p>
        </div>

        {/* Placeholder Post 2 */}
        <div style={{ padding: '16px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-glow)' }}></div>
            <div>
              <div style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>Amr Samir Edris</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>2w ago</div>
            </div>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            Just launched a new feature on AgentXpo! Workflow automation shouldn't require code. Here is how we're making it accessible...
          </p>
        </div>
      </div>
      
      <a href="https://linkedin.com/in/amrsamiredris" target="_blank" rel="noopener noreferrer" className="btn secondary-btn" style={{ marginTop: '24px', display: 'inline-block' }}>
        Follow on LinkedIn
      </a>
    </div>
  );
}
