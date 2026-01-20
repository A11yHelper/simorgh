import React from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

/**
 * Component: TopStories
 * Renders the "Top Stories" section with accessibility and usability in mind.
 */
const TopStories = ({ data }: TopStoriesProps) => {
  return (
    <section id="topStories" aria-labelledby="topStoriesTitle">
      <h2 id="topStoriesTitle">Top Stories</h2>
      <ol>
        {data.items.slice(0, 3).map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.title}</a>
            <time dateTime={new Date(item.timestamp).toISOString()}>
              {new Date(item.timestamp).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
