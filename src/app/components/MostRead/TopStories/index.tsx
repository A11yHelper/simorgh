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

const TopStories = ({ data }: TopStoriesProps) => {
  const items = data?.items?.slice(0, 3) ?? [];

  const formatDate = (iso?: string | number) => {
    if (iso === undefined || iso === null || iso === '') return '';
    try {
      const d = new Date(iso as string | number);
      if (isNaN(d.getTime())) return String(iso);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return String(iso);
    }
  };

  return (
    <section id="topStories" aria-labelledby="topStories-heading">
      <h2 id="topStories-heading">Top Stories</h2>
      <ul>
        {items.map(item => {
          const isoDate = (() => {
            try {
              const d = new Date(item.timestamp as string | number);
              return isNaN(d.getTime()) ? String(item.timestamp) : d.toISOString();
            } catch {
              return String(item.timestamp);
            }
          })();

          return (
            <li key={item.href}>
              <a href={item.href}>{item.title}</a>
              <div>
                <time dateTime={isoDate}>{formatDate(item.timestamp as string | number)}</time>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TopStories;
