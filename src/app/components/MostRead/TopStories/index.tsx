import React from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * Formats a timestamp into a human-readable date.
 * Example: "January 1, 2023"
 */
const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  return (
    <section id="topStories" aria-labelledby="topStoriesTitle">
      <h2 id="topStoriesTitle">Top Stories</h2>
      <ol>
        {data.items.slice(0, 3).map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
            <p>{formatDate(item.timestamp)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
