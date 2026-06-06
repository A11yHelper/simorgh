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

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  // Deterministic formatter to avoid SSR/client locale/timezone mismatch
  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map(item => {
          const date = item.timestamp ? new Date(item.timestamp) : null;
          const readableDate = date ? dateFormatter.format(date) : '';

          return (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>
              {date && (
                <p>
                  <time dateTime={date.toISOString()}>{readableDate}</time>
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
