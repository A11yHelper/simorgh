import { css } from '@emotion/react';
import { MostReadData } from '../types';

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

interface TopStoriesProps {
  data: MostReadData;
}

const containerStyle = {
  margin: '2rem 0',
  padding: '1.5rem',
  backgroundColor: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const itemStyle = {
  marginBottom: '1.5rem',
  ':last-of-type': { marginBottom: 0 },
};

const linkStyle = {
  color: '#005bbc',
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  ':hover': { textDecoration: 'underline' },
};

const dateStyle = {
  display: 'block',
  color: '#666',
  fontSize: '0.95rem',
  marginTop: '0.3rem',
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);
  return (
    <section id="topStories" css={containerStyle}>
      <h2 css={titleStyle}>Top Stories</h2>
      <ul css={listStyle}>
        {topItems.map(item => (
          <li key={item.href} css={itemStyle}>
            <a href={item.href} css={linkStyle}>
              {item.title}
            </a>
            <span css={dateStyle}>{formatDate(item.timestamp)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
