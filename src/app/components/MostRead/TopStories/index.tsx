import { MostReadData } from '../types';
import { css } from '@emotion/react';
import moment from 'moment';

interface TopStoriesProps {
  data: MostReadData;
}

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

const containerStyles = css({
  margin: '1.5rem 0',
  padding: 0,
});

const headingStyles = css({
  fontSize: '1.5rem',
  marginBottom: '1rem',
});

const listStyles = css({
  listStyle: 'decimal',
  paddingLeft: '1.5rem',
  margin: 0,
});

const itemStyles = css({
  marginBottom: '1.25rem',
});

const linkStyles = css({
  color: '#0044bb',
  textDecoration: 'underline',
  fontWeight: 600,
  fontSize: '1.1rem',
  ':focus': {
    outline: '2px solid #005bbc',
    outlineOffset: '2px',
  },
});

const dateStyles = css({
  display: 'block',
  color: '#555',
  fontSize: '0.95rem',
  marginTop: '0.25rem',
});

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);

  return (
    <section id="topStories" aria-labelledby="topStoriesHeading" css={containerStyles}>
      <h2 id="topStoriesHeading" css={headingStyles}>
        Top Stories
      </h2>
      <ol css={listStyles}>
        {topItems.map(item => (
          <li key={item.href} css={itemStyles}>
            <a href={item.href} css={linkStyles}>
              {item.title}
            </a>
            <time
              dateTime={new Date(item.timestamp).toISOString()}
              css={dateStyles}
            >
              {moment(item.timestamp).format('LL')}
            </time>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
