"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../src/supabaseClient';

function CVContent({ slug }) {
  const searchParams = useSearchParams();
  const [company, setCompany] = useState('Anonymous Recruiter');
  const [jobTitle, setJobTitle] = useState('Software Engineer & Tech Lead');
  const [pdfUrl, setPdfUrl] = useState('/dummy-cv.pdf');
  const [linkId, setLinkId] = useState(null);
  const [greetingVisible, setGreetingVisible] = useState(false);

  useEffect(() => {
    async function loadData() {
      let currentCompany = searchParams.get('ref') || 'Anonymous Recruiter';
      let currentTitle = searchParams.get('title') || 'Software Engineer & Tech Lead';
      let currentLinkId = null;
      let currentPdfUrl = '/dummy-cv.pdf';

      if (slug) {
        const { data, error } = await supabase.from('cv_links').select('*').eq('slug', slug).single();
        if (data) {
          currentCompany = data.company || currentCompany;
          currentTitle = data.title || currentTitle;
          currentLinkId = data.id;
          if (data.pdf_url) currentPdfUrl = data.pdf_url;
        }
      }

      setCompany(currentCompany);
      setJobTitle(currentTitle);
      setPdfUrl(currentPdfUrl);
      setLinkId(currentLinkId);

      if (currentCompany !== 'Anonymous Recruiter') {
        setGreetingVisible(true);
      }

      // Log View
      if (currentLinkId) {
        await supabase.from('cv_views').insert([{ link_id: currentLinkId, event_type: 'view' }]);
      } else if (searchParams.get('ref')) {
        await supabase.from('cv_events').insert([{ company_name: currentCompany, event_type: 'view' }]);
      }
    }
    loadData();
  }, [slug, searchParams]);

  const handleDownload = async () => {
    if (linkId) {
      await supabase.from('cv_views').insert([{ link_id: linkId, event_type: 'download' }]);
    } else if (searchParams.get('ref')) {
      await supabase.from('cv_events').insert([{ company_name: company, event_type: 'download' }]);
    }
  };

  return (
    <div style={{
      fontFamily: '"Geist", "Inter", sans-serif',
      background: '#000000',
      color: '#ededed',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: '#0a0a0a',
        border: '1px solid #333333',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%'
      }}>
        {greetingVisible && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px dashed #333333',
            borderRadius: '6px'
          }}>
            Hello <span style={{ color: '#ededed', fontWeight: 600 }}>{company}</span> team! 👋
          </div>
        )}
        
        <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Amr Samir's CV</h1>
        <p style={{ color: '#888888', marginBottom: '32px', fontSize: '15px' }}>{jobTitle}</p>
        
        <a 
          href={pdfUrl} 
          download="Amr_Samir_CV.pdf" 
          onClick={handleDownload}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            background: '#ededed',
            color: '#000000',
            padding: '14px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '16px',
            width: '100%',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download Resume
        </a>
      </div>
    </div>
  );
}

export default function CVPage({ params }) {
  // If we are in /cv/[slug], params will have slug. Otherwise undefined.
  return (
    <Suspense fallback={<div style={{ background: '#000', minHeight: '100vh' }}></div>}>
      <CVContent slug={params?.slug} />
    </Suspense>
  );
}
