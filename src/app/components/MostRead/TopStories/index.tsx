import React from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * Component: TopStories
 * Description: Renders the "Top Stories" section with accessible and semantic HTML.
 */
const TopStories = ({ data }: TopStoriesProps) => {
  // Format the timestamp into a readable date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
