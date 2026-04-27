import { MostReadData } from '../types';

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

const formatDate = (timestamp: string | number) => {
  const date = new Date(timestamp);
  // Example: "12 March 2024"
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data.items?.slice(0, 3) ?? [];

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h1 id="topStories-heading">Top Stories</h1>
      <ol>
        {items.map(item => (
          <li key={item.href}>
            <a href={item.href}>{item.title}</a>
            <div>
              <time dateTime={new Date(item.timestamp).toISOString()}>
                {formatDate(item.timestamp)}
              </time>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TopStories;
