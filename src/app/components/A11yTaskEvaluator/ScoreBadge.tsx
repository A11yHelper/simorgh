import React from 'react';
import type { Score } from './types';

function scoreBadgeStyle(score?: Score): React.CSSProperties {
  const base: React.CSSProperties = {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: 8,
    fontWeight: 800,
    fontSize: 12,
    color: '#fff',
    background: '#555',
  };
  if (score === 2) base.background = '#1f8f4a';
  if (score === 1) base.background = '#a15c00';
  if (score === 0) base.background = '#b42318';
  return base;
}

export default scoreBadgeStyle;
