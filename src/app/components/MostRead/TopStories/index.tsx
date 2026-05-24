import { css } from '@emotion/react';
import { MostReadData } from '../types';

interface TopStoriesProps {
  data: MostReadData;
}

const sectionStyles = css({
  margin: '2rem 0',
  padding: 0,
});

const headingStyles = css({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '1rem',
  marginTop: 0,
  lineHeight: 1.2,
});

const listStyles = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
});

const itemStyles = css({
  background: '#fff',
  borderRadius: '0.5rem',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
});

const linkStyles = css({
  color: '#005bbc',
  fontWeight: 600,
  fontSize: '1.1rem',
  textDecoration: 'none',
  lineHeight: 1.3,
  ':hover, :focus-visible': {
    textDecoration: 'underline',
  },
});

const dateStyles = css({
  fontSize: '0.95rem',
  color: '#666',
  marginTop: '0.5rem',
});

function formatDate(timestamp: string | number) {
  const date = new Date(Number(timestamp));
  // a11y-helper FIXME: Confirm that all timestamps are valid numbers or ISO strings
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data.items?.slice(0, 3) ?? [];
  return (
    <section
      id="topStories"
      aria-labelledby="topStories-heading"
      css={sectionStyles}
    >
      <h2 id="topStories-heading" css={headingStyles}>
        Top Stories
      </h2>
      <ul css={listStyles}>
        {items.map(item => (
          <li key={item.id} css={itemStyles}>
            <a href={item.href} css={linkStyles}>
              {item.title}
            </a>
            <time
              dateTime={new Date(Number(item.timestamp)).toISOString()}
              css={dateStyles}
            >
              {formatDate(item.timestamp)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
