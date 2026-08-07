'use client';
import Image from 'next/image';

export default function MediaGallery() {
  const dummyImages = [
    { id: 1, src: '/images/gallery/stage_management_1786130864071.jpg', title: 'Stage Production' },
    { id: 2, src: '/images/gallery/crowd_management_1786130873883.jpg', title: 'Crowd Management' },
    { id: 3, src: '/images/gallery/backstage_management_1786130884576.jpg', title: 'Backstage Operations' },
    { id: 4, src: '/images/gallery/back_of_house_1786130894232.jpg', title: 'Back of House / Control Room' },
    { id: 5, src: '/images/gallery/summer_festival_1786130931967.jpg', title: 'Summer Festival' },
    { id: 6, src: '/images/gallery/concert_management_1786130943537.jpg', title: 'Concerts & Arena Tours' },
    { id: 7, src: '/images/gallery/corporate_conference_1786130953485.jpg', title: 'Corporate Conferences' },
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
            background: 'var(--bg-secondary)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
              <Image 
                src={img.src} 
                alt={img.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '12px' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
