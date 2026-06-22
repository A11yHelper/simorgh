import React, { useMemo } from 'react';
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
    imageAlt: 'Match action featuring Real Madrid and Manchester City players',
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
    imageAlt: 'Photograph of celebrities and performers at the Super Bowl',
    id: 'cew5rdyv8xno',
  },
];

const containerStyles = {
  section: {
    marginTop: 24,
  },
  gridList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  card: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 4,
    objectFit: 'cover' as const,
    marginBottom: 8,
  },
  headline: {
    margin: '0 0 6px 0',
    fontSize: '1rem',
    lineHeight: 1.2,
  },
  time: {
    color: '#555',
    fontSize: '0.875rem',
  },
};

function resolveLocale() {
  if (typeof document !== 'undefined' && document.documentElement?.lang) {
    return document.documentElement.lang;
  }
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language;
  }
  return 'en-GB';
}

function formatReadableDate(isoString: string) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat(resolveLocale(), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/**
 * Determine accessible alt text for an image.
 * - If product provided a string (including empty string), use it as-is. Empty string = decorative.
 * - If missing (undefined), treat as decorative for now but include a TODO so product can supply a meaningful alt if needed.
 */
function getImageAlt(imageAlt: string | undefined, id: string) {
  if (typeof imageAlt === 'string') return imageAlt;
  // a11y-helper TODO: Provide a meaningful alt text for image t4Image-{id} if the image conveys information.
  // If the image is purely decorative, confirm and keep alt="".
  return '';
}

export default function SeoImageGrid() {
  const items = useMemo(() => T4_MOCK_DATA, []);
  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGrid-heading" css={containerStyles.section}>
      <h2 id="t4SeoImageGrid-heading">Sport</h2>
      <ul css={containerStyles.gridList}>
        {items.map(item => {
          const readable = formatReadableDate(item.lastPublished);
          const iso = (() => {
            const d = new Date(item.lastPublished);
            return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
          })();

          return (
            <li key={item.id}>
              <article css={containerStyles.card}>
                <img
                  id={`t4Image-${item.id}`}
                  src={item.imageUrl}
                  alt={getImageAlt(item.imageAlt, item.id)}
                  css={containerStyles.image}
                />
                <h3 css={containerStyles.headline}>
                  <a href={item.link}>{item.title}</a>
                </h3>
                {readable && iso ? (
                  <div css={containerStyles.time}>
                    <time dateTime={iso}>{readable}</time>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
