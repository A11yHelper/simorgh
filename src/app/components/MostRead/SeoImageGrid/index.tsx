import React from 'react';
import moment from 'moment';

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

export default function SeoImageGrid() {
  const styles = {
    section: {
      padding: '0 0 24px 0',
    },
    list: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    item: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
    },
    img: {
      width: '100%',
      height: 'auto',
      display: 'block',
    },
    headline: {
      margin: 0,
      fontSize: '1rem',
      lineHeight: '1.2',
    },
    date: {
      color: '#555',
      fontSize: '0.875rem',
    },
  };

  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGrid-heading" style={styles.section}>
      <h2 id="t4SeoImageGrid-heading">Sport</h2>
      <ul style={styles.list}>
        {T4_MOCK_DATA.map(item => {
          const readable = moment(item.lastPublished).format('D MMMM YYYY');
          const dateTime = new Date(item.lastPublished).toISOString();

          return (
            <li key={item.id} style={styles.item}>
              <figure style={{ margin: 0 }}>
                <img
                  id={`t4Image-${item.id}`}
                  src={item.imageUrl}
                  alt={item.imageAlt ?? ''}
                  style={styles.img}
                />
                {/* a11y-helper TODO: Provide a descriptive alt text for this image if it conveys meaningful content */}
              </figure>

              <h3 style={styles.headline}>
                <a href={item.link}>{item.title}</a>
              </h3>

              <div style={styles.date}>
                <time dateTime={dateTime}>{readable}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
