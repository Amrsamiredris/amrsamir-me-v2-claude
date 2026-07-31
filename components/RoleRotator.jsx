"use client";

import { useState, useEffect } from 'react';

const TITLES = [
  'Project Manager',
  'Event Coordinator',
  'Marketing Strategist',
  'Show Caller',
  'Stage Manager'
];

export default function RoleRotator() {
  const [idx, setIdx] = useState(0);
  const [animateState, setAnimateState] = useState('in'); // 'in' or 'out'

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateState('out');

      setTimeout(() => {
        setIdx((prev) => (prev + 1) % TITLES.length);
        setAnimateState('in');
      }, 300);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="role-rotator" id="role-rotator">
      <span className={`role-text ${animateState}`} id="role-text">
        {TITLES[idx]}
      </span>
    </div>
  );
}
