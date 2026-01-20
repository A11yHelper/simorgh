/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const containerStyles = {
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  marginBottom: '32px',
};

const titleStyles = {
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '16px',
};

const listStyles = {
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const itemStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const linkStyles = {
  color: '#005bbc',
  fontSize: '1.125rem',
  fontWeight: 600,
  textDecoration: 'none',
  marginBottom: '4px',
  '&:hover': {
    textDecoration: 'underline',
  },
};

const dateStyles = {
  fontSize: '0.875rem',
  color: '#666',
};

const formatDate = (timestamp: number) =>
  new Date(timestamp).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const TopStories = ({ data }: TopStoriesProps) => {
  const topThree = data.items.slice(0, 3);

  return (
    <section id="topStories" css={containerStyles}>
      <h2 css={titleStyles}>Top Stories</h2>
      <ul css={listStyles}>
        {topThree.map(({ href, title, timestamp }) => (
          <li key={href} css={itemStyles}>
            <a href={href} css={linkStyles}>
              {title}
            </a>
            <span css={dateStyles}>{formatDate(timestamp)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
