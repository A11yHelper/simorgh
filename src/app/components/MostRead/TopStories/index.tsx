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

const formatDate = (timestamp: number | string) => {
  const date = new Date(Number(timestamp));
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const TopStories = ({ data }: TopStoriesProps) => {
  const topItems = data.items.slice(0, 3);

  return (
    <section id="topStories" style={{ margin: '2rem 0' }}>
      <h2 style={{ marginBottom: '1rem' }}>Top Stories</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {topItems.map(item => (
          <li key={item.id} style={{ marginBottom: '2rem' }}>
            <a
              href={item.href}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#0044bb',
                textDecoration: 'none',
              }}
            >
              {item.title}
            </a>
            <div
              style={{
                fontSize: '0.95rem',
                color: '#555',
                marginTop: '0.25rem',
              }}
            >
              {formatDate(item.timestamp)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopStories;
