"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Hide on admin and login pages
  if (pathname?.startsWith('/admin') || pathname?.startsWith('/login')) {
    return null;
  }

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <div className="nav-left">
          <Link href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            Amr.
          </Link>
        </div>
        <button 
          className="mobile-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {isOpen ? 'Close' : 'Menu'}
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/events" className={`nav-link ${pathname === '/events' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Events
          </Link>
          <Link href="/marketing" className={`nav-link ${pathname === '/marketing' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            Marketing
          </Link>
          <Link href="/ai" className={`nav-link ${pathname === '/ai' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
            AI & Tech
          </Link>
        </div>
      </div>
    </nav>
  );
}
