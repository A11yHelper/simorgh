import { MostReadData } from '../types';
import { css } from '@emotion/react';

interface TopStoriesProps {
  data: MostReadData;
}

const containerStyles = {
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  padding: 24,
  marginBottom: 32,
  maxWidth: 480,
};

const titleStyles = {
  fontSize: 24,
  fontWeight: 700,
  marginBottom: 20,
};

const listStyles = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const itemStyles = {
  marginBottom: 20,
};

const linkStyles = {
  fontSize: 18,
  fontWeight: 500,
  color: '#005bbc',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline',
  },
};

const dateStyles = {
  fontSize: 14,
  color: '#666',
  marginTop: 4,
};

const formatDate = (timestamp: number | string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);

  return (
    <section id="topStories" css={containerStyles}>
      <h2 css={titleStyles}>Top Stories</h2>
      <ul css={listStyles}>
        {topItems.map(({ id, href, title, timestamp }) => (
          <li key={id} css={itemStyles}>
            <a href={href} css={linkStyles}>
              {title}
            </a>
            <div css={dateStyles}>{formatDate(timestamp)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
