import React from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const formatDate = (timestamp: number) => {
  // Assumes timestamp is in milliseconds
  return new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStories-heading" style={{ margin: '2rem 0' }}>
      <h2 id="topStories-heading" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
        Top Stories
      </h2>
      <ol style={{ listStyle: 'decimal inside', padding: 0, margin: 0 }}>
        {topItems.map((item, idx) => (
          <li key={item.href} style={{ marginBottom: '1.5rem' }}>
            <a
              href={item.href}
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#005bbc',
                textDecoration: 'underline',
                outline: 'auto',
              }}
            >
              {item.title}
            </a>
            <br />
            <time
              dateTime={new Date(item.timestamp).toISOString()}
              style={{ color: '#555', fontSize: '0.95rem', display: 'block', marginTop: '0.25rem' }}
            >
              {formatDate(item.timestamp)}
            </time>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
