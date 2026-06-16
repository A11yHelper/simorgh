import React from 'react';
import moment from 'moment';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items ?? [];
  if (items.length === 0) return null;

  const topThree = items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {topThree.map(item => {
          // Use UTC + fixed locale so server and client render identical readable strings
          const readable = moment.utc(item.timestamp).locale('en').format('D MMMM YYYY'); // a11y-helper FIXME: verify locale ('en') is correct for this page
          const dateTime = moment.utc(item.timestamp).toISOString();
          const key = `${item.href}-${item.timestamp}`;
          return (
            <li key={key}>
              <a href={item.href}>{item.title}</a>
              <div>
                <time dateTime={dateTime}>{readable}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
