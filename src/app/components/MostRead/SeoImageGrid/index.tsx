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
      'https://ichef.bbci.co.uk/ace/ws/594/cpsprodpb/faf5/live/6452c2b0-e9e6-11ef-a319-fb4e7360c4ec.jpg.webp',
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
      'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6818/live/27d31820-e78f-11ef-bd1b-d536627785f2.jpg.webp',
    description:
      'Oda stars wey show for New Orleans include Jay-Z, Blue Ivy, Samuel L Jackson and Bradley Cooper.',
    imageAlt: '',
    id: 'cew5rdyv8xno',
  },
];

const sectionStyles = {
  marginTop: '2rem',
  marginBottom: '2rem',
};

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '1.5rem',
};

const cardStyles = {
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,
  minWidth: 0,
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  display: 'block',
};

const contentStyles = {
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '0.5rem',
};

const titleStyles = {
  fontSize: '1rem',
  fontWeight: 600,
  margin: 0,
  color: '#222',
  textDecoration: 'none',
  lineHeight: 1.3,
};

const dateStyles = {
  fontSize: '0.875rem',
  color: '#666',
};

export default function SeoImageGrid() {
  return (
    <section
      id="t4SeoImageGrid"
      css={sectionStyles}
      aria-labelledby="t4SeoImageGrid-heading"
    >
      <h2 id="t4SeoImageGrid-heading" style={{ marginBottom: '1.5rem' }}>
        {'    Sport    '}
      </h2>
      <div css={gridStyles}>
        {T4_MOCK_DATA.map(item => (
          <article key={item.id} css={cardStyles}>
            <a
              href={item.link}
              tabIndex={-1}
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl}
                alt=""
                css={imageStyles}
              />
            </a>
            <div css={contentStyles}>
              <a href={item.link} css={titleStyles}>
                {item.title}
              </a>
              <time dateTime={item.lastPublished} css={dateStyles}>
                {new Date(item.lastPublished).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
