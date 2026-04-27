import React from 'react';

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

/**
 * TODO: TASK T4
 * Add a standalone "Sport" section.
 *
 * Requirements:
 * 1. Insert a section titled "Sport".
 * 2. The section must use id="t4SeoImageGrid".
 * 3. Render items from T4_MOCK_DATA in a 2-column layout.
 * 4. For each item, render from top to bottom:
 *    - An image
 *    - A headline
 *    - A readable date
 * 5. The card or headline must link to item.link.
 *
 * Resources:
 * - Use T4_MOCK_DATA as the data source for the section.
 * - Use item.imageUrl as the image source.
 * - Format item.lastPublished as a readable date.
 * - Each image must use id="t4Image-<item.id>".
 *
 * Constraints:
 * - Keep the markup semantic and clean.
 * - Do not use external UI libraries.
 *
 * You can preview your changes at http://localhost:7080/pidgin/popular/read
 */

const sectionStyle = {
  margin: '2rem 0',
  padding: '1.5rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1.5rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  padding: 0,
  margin: 0,
};

const cardStyle = {
  background: '#f7f7f7',
  borderRadius: '6px',
  overflow: 'hidden',
  textAlign: 'left',
  boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  display: 'block',
  aspectRatio: '16/9',
  objectFit: 'cover',
};

const headlineStyle = {
  color: '#005bbc',
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '1.1rem',
  margin: '1rem 1rem 0.5rem 1rem',
  ':hover': { textDecoration: 'underline' },
};

const dateStyle = {
  color: '#666',
  fontSize: '0.95rem',
  margin: '0 1rem 1rem 1rem',
};

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" css={sectionStyle}>
      <h2 css={titleStyle}>Sport</h2>
      <ul css={gridStyle}>
        {T4_MOCK_DATA.map(item => (
          <li key={item.id} css={cardStyle}>
            <a href={item.link} style={{ display: 'block' }}>
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl}
                alt={item.imageAlt || item.title}
                css={imageStyle}
              />
            </a>
            <a href={item.link} css={headlineStyle}>
              {item.title}
            </a>
            <span css={dateStyle}>{formatDate(item.lastPublished)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
