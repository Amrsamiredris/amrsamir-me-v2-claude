'use client';

export default function MediaGallery() {
  const dummyImages = [
    { id: 1, src: 'https://via.placeholder.com/600x400/1e293b/94a3b8?text=Event+Stage', title: 'Main Stage' },
    { id: 2, src: 'https://via.placeholder.com/400x600/1e293b/94a3b8?text=Crowd', title: 'Crowd' },
    { id: 3, src: 'https://via.placeholder.com/600x800/1e293b/94a3b8?text=Backstage', title: 'Backstage' },
    { id: 4, src: 'https://via.placeholder.com/800x600/1e293b/94a3b8?text=VIP+Lounge', title: 'VIP Lounge' },
    { id: 5, src: 'https://via.placeholder.com/400x400/1e293b/94a3b8?text=Production', title: 'Production Desk' },
  ];

  return (
    <div style={{ marginTop: '32px' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 'var(--font-semibold)', marginBottom: '24px', color: 'var(--text-primary)' }}>
        Project Gallery
      </h3>
      
      {/* Basic CSS Grid Masonry approximation */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
        alignItems: 'start'
      }}>
        {dummyImages.map((img) => (
          <div key={img.id} style={{ 
            borderRadius: 'var(--radius-md)', 
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)'
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.src} 
              alt={img.title}
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
            />
            <div style={{ padding: '12px' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
