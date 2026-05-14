import React from 'react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  if (items.length === 0) return null;

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>

      <ul>
        {items.map(item => {
          const date = item.timestamp ? new Date(item.timestamp) : null;
          const readableDate = date
            ? date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '';

          return (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>
              {date && (
                <div>
                  <time dateTime={date.toISOString()}>{readableDate}</time>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
