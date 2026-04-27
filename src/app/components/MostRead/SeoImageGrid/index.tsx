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

const gridStyles = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const cardStyles = css({
  display: 'flex',
  flexDirection: 'column',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: 4,
  overflow: 'hidden',
  outline: 'none',
  ':focus-visible': {
    boxShadow: '0 0 0 3px #005bbc',
  },
});

const imageStyles = css({
  width: '100%',
  height: 'auto',
  display: 'block',
});

const headlineStyles = css({
  fontSize: '1.1rem',
  fontWeight: 600,
  margin: '0.5rem 0 0.25rem',
});

const dateStyles = css({
  fontSize: '0.95rem',
  color: '#555',
  marginBottom: '0.5rem',
});

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGrid-heading">
      <h2 id="t4SeoImageGrid-heading">Sport</h2>
      <ul css={gridStyles}>
        {T4_MOCK_DATA.map(item => (
          <li key={item.id}>
            <a
              href={item.link}
              css={cardStyles}
              tabIndex={0}
              aria-labelledby={`t4Image-${item.id} t4Headline-${item.id}`}
            >
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl}
                alt={item.imageAlt?.trim() || item.title}
                css={imageStyles}
              />
              <div>
                <div id={`t4Headline-${item.id}`} css={headlineStyles}>
                  {item.title}
                </div>
                <time
                  css={dateStyles}
                  dateTime={new Date(item.lastPublished).toISOString()}
                >
                  {formatDate(item.lastPublished)}
                </time>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
