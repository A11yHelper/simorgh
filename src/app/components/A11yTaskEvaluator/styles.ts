import type React from 'react';

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    position: 'fixed',
    right: 16,
    bottom: 16,
    width: 380,
    maxHeight: '55vh',
    overflow: 'auto',
    zIndex: 999999,
    background: '#111',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: 12,
    boxShadow: '0 10px 30px rgba(0,0,0,.4)',
    padding: 12,
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    fontSize: 12,
    lineHeight: 1.4,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  btn: {
    cursor: 'pointer',
    background: '#222',
    color: '#fff',
    border: '1px solid rgba(255,255,255,.15)',
    borderRadius: 8,
    padding: '4px 8px',
    fontWeight: 800,
  },
  finding: {
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  nodeLine: {
    marginTop: 4,
    wordBreak: 'break-word',
  },
  code: {
    background: 'rgba(255,255,255,.08)',
    padding: '1px 6px',
    borderRadius: 6,
  },
};

export default styles;
