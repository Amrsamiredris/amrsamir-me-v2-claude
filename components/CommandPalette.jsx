"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const commands = [
    { name: 'Home Hub', path: '/' },
    { name: 'Events Persona', path: '/events' },
    { name: 'Marketing Persona', path: '/marketing' },
    { name: 'AI & Tech Persona', path: '/ai' },
    { name: 'Subscribe Newsletter', path: '/#newsletter' }
  ];

  const filteredCommands = commands.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-backdrop visible" onClick={(e) => e.target.classList.contains('cmd-palette-backdrop') && setIsOpen(false)}>
      <div className="cmd-palette">
        <input 
          ref={inputRef}
          type="text" 
          className="cmd-input" 
          placeholder="Search commands... (e.g. 'contact')" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off" 
        />
        <div className="cmd-results">
          {filteredCommands.map((cmd, idx) => (
            <Link key={idx} href={cmd.path} className="cmd-item" style={{ display: 'flex' }} onClick={() => setIsOpen(false)}>
              <span>{cmd.name}</span>
              <span className="cmd-kbd">↵</span>
            </Link>
          ))}
          {filteredCommands.length === 0 && (
            <div style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>No commands found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
