import { MostReadData } from '../types';
import styles from './index.styles';

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

const formatReadableDate = (timestamp: number | string) => {
  const date = new Date(timestamp);

  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topStories = data.items.slice(0, 3);

  return (
    <section
      id="topStories"
      aria-labelledby="top-stories-title"
      css={styles.section}
    >
      <h2 id="top-stories-title" css={styles.title}>
        Top Stories
      </h2>
      <ul css={styles.list}>
        {topStories.map(item => (
          <li key={item.id} css={styles.item}>
            <a href={item.href} css={styles.link}>
              {item.title}
            </a>
            <time
              dateTime={new Date(item.timestamp).toISOString()}
              css={styles.timestamp}
            >
              {formatReadableDate(item.timestamp)}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
