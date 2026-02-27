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

/**
 * TODO: TASK T4
 *
 * Layout requirements:
 * - Build a standalone section titled "Sport".
 * - The section MUST use: id="t4SeoImageGrid".
 * - Render 2 items in a 2-column layout.
 * - Each item should include (top → bottom):
 *   - Image
 *   - Headline
 *   - Formatted date
 * - The card or headline should be clickable (link to item.link).
 *
 * Data usage:
 * - Use the provided mock data (do not hardcode titles/dates/urls).
 * - Use item.imageUrl as the image src.
 * - Format item.lastPublished as a readable date.
 * - Each image MUST use: id="t4Image-<item.id>".
 *
 * Keep the markup semantic and clean. No external UI libraries.
 */

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGridHeading">
      <h2 id="t4SeoImageGridHeading">Sport</h2>
      <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', listStyle: 'none', padding: 0, margin: 0 }}>
        {T4_MOCK_DATA.slice(0, 2).map(item => (
          <li key={item.id}>
            <a href={item.link} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl.replace('{width}', '320')}
                alt={item.imageAlt && item.imageAlt.trim() ? item.imageAlt : item.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <h3 style={{ margin: '0.5rem 0 0.25rem' }}>{item.title}</h3>
              <time dateTime={item.lastPublished}>
                {new Date(item.lastPublished).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
