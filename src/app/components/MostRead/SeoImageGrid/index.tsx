import React from 'react';

const T4_MOCK_DATA = [
  {
    type: 'article',
    isLive: true,
    title: 'Champions League knockout phase begins',
    lastPublished: '2025-02-13T10:52:48.687Z',
    link: 'https://www.bbc.com/pidgin/articles/cq8k9lqxyd8o',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/594/cpsprodpb/faf5/live/6452c2b0-e9e6-11ef-a319-fb4e7360c4ec.jpg.webp',
    description:
      'Di two-leg Champions League knockout phase play-offs start dis week, Manchester City and Real Madrid dey among di 16 teams wey don dey hope to reach di last 16.',
    imageAlt: 'Champions League match in progress',
    id: 'cq8k9lqxyd8o',
  },
  {
    type: 'article',
    isLive: false,
    title: 'Kendrick Lamar, Donald Trump, and celebs at Super Bowl',
    lastPublished: '2025-02-10T10:00:48.820Z',
    link: 'https://www.bbc.com/pidgin/articles/cew5rdyv8xno',
    imageUrl:
      'https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/6818/live/27d31820-e78f-11ef-bd1b-d536627785f2.jpg.webp',
    description:
      'Oda stars wey show for New Orleans include Jay-Z, Blue Ivy, Samuel L Jackson and Bradley Cooper.',
    imageAlt: 'Kendrick Lamar performing at the Super Bowl',
    id: 'cew5rdyv8xno',
  },
];

export default function SeoImageGrid() {
  return (
    <section id="t4SeoImageGrid" aria-labelledby="sport-section-title">
      <h2 id="sport-section-title">Sport</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
        }}
      >
        {T4_MOCK_DATA.map((item) => (
          <article key={item.id}>
            <a href={item.link}>
              <img
                id={`t4Image-${item.id}`}
                src={item.imageUrl}
                alt={item.imageAlt}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{item.title}</h3>
            </a>
            <time dateTime={item.lastPublished}>
              {new Date(item.lastPublished).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </article>
        ))}
      </div>
    </section>
  );
}
