import React from 'react';
import moment from 'moment';
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

const sectionStyles = css({
  margin: '24px 0',
});

const headingStyles = css({
  margin: '0 0 12px 0',
  fontSize: '1.25rem',
  lineHeight: 1.2,
});

const gridStyles = css({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  '@media (max-width: 480px)': {
    gridTemplateColumns: '1fr',
  },
});

const cardStyles = css({
  display: 'block',
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: 4,
  overflow: 'hidden',
});

const imageStyles = css({
  width: '100%',
  height: 'auto',
  display: 'block',
});

const headlineStyles = css({
  margin: '8px 0 4px 0',
  fontSize: '1rem',
  lineHeight: 1.25,
});

const dateStyles = css({
  margin: 0,
  color: '#666',
  fontSize: '0.875rem',
});

export default function SeoImageGrid() {
  const items = T4_MOCK_DATA;

  if (!items || items.length === 0) return null;

  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGrid-heading" css={sectionStyles}>
      <h2 id="t4SeoImageGrid-heading" css={headingStyles}>
        Sport
      </h2>

      <ul css={gridStyles}>
        {items.map(item => {
          const iso = item.lastPublished ? moment(item.lastPublished).toISOString() : undefined;
          const readable = item.lastPublished ? moment(item.lastPublished).format('D MMMM YYYY') : '';

          const alt =
            item.imageAlt && item.imageAlt.trim().length > 0 ? item.imageAlt : '';

          // a11y-helper TODO: Provide descriptive alt text for image id {item.id} if empty.
          return (
            <li key={item.id}>
              <a href={item.link} css={cardStyles}>
                <img id={`t4Image-${item.id}`} src={item.imageUrl} alt={alt} css={imageStyles} />
                <h3 css={headlineStyles}>{item.title}</h3>
              </a>
              {iso ? (
                <p css={dateStyles}>
                  <time dateTime={iso}>{readable}</time>
                </p>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
