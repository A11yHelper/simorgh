import React from 'react';
import { MostReadData } from '../types';



interface TopStoriesProps {
  data: MostReadData;
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map((item, idx) => {
          const date = item.timestamp ? new Date(item.timestamp) : null;
          const readable = date
            ? date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : '';
          const datetime = date ? date.toISOString() : undefined;

          return (
            <li key={item.href ?? idx}>
              {item.href ? (
                <a href={item.href} aria-label={item.title ?? 'Read full story'}>
                  {item.title ?? 'Read full story'}
                </a>
              ) : (
                <span>{item.title ?? 'Untitled story'}</span>
              )}
              {readable && (
                <div>
                  <time dateTime={datetime}>{readable}</time>
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
