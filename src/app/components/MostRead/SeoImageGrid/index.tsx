import React from 'react';
import { css } from '@emotion/react';

type MostReadSeoItem = {
  id: string;
  type: 'article';
  isLive: boolean;
  title: string;
  firstPublished: string;
  lastPublished: string;
  link: string;
  imageUrl: string;
  description: string;
  imageAlt?: string;
};

export const T4_MOCK_DATA: MostReadSeoItem[] = [
  {
    type: 'article',
    isLive: false,
    title:
      'Real Madrid vs Manchester City, and oda fixtures for di Champions League knockout play-off second leg',
    firstPublished: '2025-02-11T09:57:42.029Z',
    lastPublished: '2025-02-13T10:52:48.687Z',
    link: 'https://www.bbc.com/pidgin/articles/cq8k9lqxyd8o',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/faf5/live/6452c2b0-e9e6-11ef-a319-fb4e7360c4ec.jpg.webp',
    description:
      'Di two-leg Champions League knockout phase play-offs start dis week, Manchester City and Real Madrid dey among di 16 teams wey don dey hope to reach di last 16.',
    imageAlt: '',
    id: 'cq8k9lqxyd8o',
  },
  {
    type: 'article',
    isLive: false,
    title: 'Kendrick Lamar, Donald Trump, and celebs wey show for Super Bowl ',
    firstPublished: '2025-02-10T10:00:48.820Z',
    lastPublished: '2025-02-10T10:00:48.820Z',
    link: 'https://www.bbc.com/pidgin/articles/cew5rdyv8xno',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/afed/live/c4059be0-e795-11ef-bd1b-d536627785f2.jpg.webp',
    description:
      'Oda stars wey show for New Orleans include Jay-Z, Blue Ivy, Samuel L Jackson and Bradley Cooper.',
    imageAlt: '',
    id: 'cew5rdyv8xno',
  },
];

const sectionStyles = {
  margin: '2rem 0',
};

const headingStyles = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
};

const cardStyles = {
  background: '#fff',
  borderRadius: '0.5rem',
  overflow: 'hidden',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  textDecoration: 'none',
  color: 'inherit',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const headlineStyles = {
  fontSize: '1rem',
  fontWeight: 600,
  margin: '1rem 1rem 0.5rem 1rem',
  lineHeight: 1.3,
};

const dateStyles = {
  fontSize: '0.875rem',
  color: '#555',
  margin: '0 1rem 1rem 1rem',
};

const formatDate = (isoString: string) =>
  new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" css={sectionStyles}>
      <h2 css={headingStyles}>Sport</h2>
      <div css={gridStyles}>
        {T4_MOCK_DATA.map(item => (
          <a
            key={item.id}
            href={item.link}
            css={cardStyles}
            aria-label={item.title}
          >
            <img
              id={`t4Image-${item.id}`}
              src={item.imageUrl.replace('{width}', '464')}
              alt={item.imageAlt || item.title}
              css={imageStyles}
            />
            <div css={headlineStyles}>{item.title}</div>
            <div css={dateStyles}>{formatDate(item.lastPublished)}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
