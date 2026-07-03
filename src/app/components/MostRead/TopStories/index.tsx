import React from 'react';

import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const readableDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const sectionStyles = {
  marginBlock: '1.5rem',
  fontFamily: 'inherit',
};

const headingStyles = {
  margin: '0 0 1rem',
};

const listStyles = {
  display: 'grid',
  gap: '1rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const itemStyles = {
  margin: 0,
};

const linkStyles = {
  color: 'inherit',
  textDecoration: 'none',
  fontFamily: 'inherit',
};

const titleStyles = {
  margin: '0 0 0.25rem',
  fontFamily: 'inherit',
};

const dateStyles = {
  display: 'block',
  fontSize: '0.875rem',
  lineHeight: 1.4,
  fontFamily: 'inherit',
};

const formatReadableDate = (timestamp: string) => {
  const publishedDate = new Date(timestamp);

  if (Number.isNaN(publishedDate.getTime())) {
    return timestamp;
  }

  return readableDateFormatter.format(publishedDate);
};

/**
 * TODO: TASK T3
 * Add a "Top Stories" section.
 *
 * Requirements:
 * 1. Insert a standalone container with the title "Top Stories".
 * 2. The container must use id="topStories".
 * 3. Display the first 3 items from props.data.items in a vertical list.
 * 4. For each item, render:
 *    - A clickable title link
 *    - A readable date below the title
 *
 * Resources:
 * - Use item.href for the link URL.
 * - Use item.title for the link text.
 * - Format item.timestamp as a readable date.
 * - Do not hardcode content; render everything from props.data.
 *
 * You can preview your changes at http://localhost:7080/pidgin/popular/read
 */

const TopStories = ({ data }: TopStoriesProps) => {
  const topStories = data.items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStories-heading" style={sectionStyles}>
      <h2 id="topStories-heading" style={headingStyles}>
        Top Stories
      </h2>

      <ul style={listStyles}>
        {topStories.map((item) => {
          const readableDate = formatReadableDate(item.timestamp);

          return (
            <li key={item.href} style={itemStyles}>
              <article>
                <h3 style={titleStyles}>
                  <a href={item.href} style={linkStyles}>
                    {item.title}
                  </a>
                </h3>
                <time dateTime={item.timestamp} style={dateStyles}>
                  {readableDate}
                </time>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
