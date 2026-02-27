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

function formatDate(iso: string) {
  const date = new Date(iso);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" aria-labelledby="t4SeoImageGrid-heading">
      <h2 id="t4SeoImageGrid-heading">Sport</h2>
      <ul
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}
      >
        {T4_MOCK_DATA.slice(0, 2).map(item => (
          <li key={item.id}>
            <a
              href={item.link}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                borderRadius: '4px',
                outline: 'none',
                boxShadow: '0 0 0 2px transparent',
              }}
            >
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl.replace('{width}', '320')}
                alt={item.imageAlt && item.imageAlt.trim() ? item.imageAlt : item.title}
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '4px 4px 0 0' }}
              />
              <h3 style={{ fontSize: '1rem', margin: '0.5em 0 0.25em' }}>{item.title}</h3>
              <time dateTime={item.lastPublished} style={{ fontSize: '0.9em', color: '#555' }}>
                {formatDate(item.lastPublished)}
              </time>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
